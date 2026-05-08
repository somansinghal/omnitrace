/* ═══════════════════════════════════════════
   OmniTrace Payment Service (Razorpay)
   ═══════════════════════════════════════════ */

import Firebase from './firebase.js';
import OmniDB from './omnidb.js';
import Store from '../assets/js/store.js';

// Razorpay Key — Replace with your Razorpay Key ID
const RAZORPAY_KEY = 'rzp_test_YOUR_KEY_ID';
const PAYMENT_API_BASE = '/api/payments';

const PLAN_PRICES = {
  starter: { monthly: 99, yearly: 950 },     // ~20% off yearly (₹79/mo billed yearly)
  pro: { monthly: 499, yearly: 4790 },       // ~20% off yearly (₹399/mo billed yearly)
  enterprise: { monthly: 0, yearly: 0 }      // Custom
};

const Payments = {

  getPlanPrice(plan, billing) {
    return PLAN_PRICES[plan]?.[billing] || 0;
  },

  getPlanLimits(plan) {
    const limits = {
      free: { products: 10, analytics: false, api: false, support: 'Community' },
      starter: { products: 100, analytics: true, api: false, support: 'Email' },
      pro: { products: Infinity, analytics: true, api: true, support: 'Priority' },
      enterprise: { products: Infinity, analytics: true, api: true, support: 'Dedicated' }
    };
    return limits[plan] || limits.free;
  },

  async initiatePayment(plan, billing, coupon = null) {
    const user = Firebase.getCurrentUser();
    if (!user) throw new Error('Please login to upgrade your plan.');

    if (plan === 'enterprise') {
      window.showToast('Please contact our sales team for Enterprise pricing.', 'info');
      return;
    }

    let amount = this.getPlanPrice(plan, billing);
    if (amount <= 0) throw new Error('Invalid plan or billing cycle.');

    // Apply coupon discount
    if (coupon && coupon.discountAmount) {
      amount = amount - coupon.discountAmount;
      if (amount < 0) amount = 0;
    }

    try {
      const idToken = await user.getIdToken?.();

      // Create a payment record first for auditability.
      const paymentRecord = await OmniDB.createPayment({
        userId: user.uid,
        plan,
        amount,
        couponCode: coupon?.code || '',
        billingCycle: billing,
        status: 'pending'
      });

      // Production path: create an order on your backend/Cloud Function.
      // The server must use the Razorpay secret and return { orderId }.
      const order = await this.createOrder({
        paymentId: paymentRecord.id,
        plan,
        billing,
        amount,
        couponCode: coupon?.code || ''
      }, idToken);

      // Open Razorpay
      return new Promise((resolve, reject) => {
        const options = {
          key: RAZORPAY_KEY,
          amount: amount * 100, // Razorpay expects paise
          currency: 'INR',
          order_id: order?.orderId || undefined,
          name: 'OmniTrace',
          description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan — ${billing}`,
          image: '',
          handler: async function (response) {
            try {
              // Production path: verify HMAC on backend. If backend is not wired in local
              // development, fail closed unless explicitly running with dev fallback.
              await Payments.verifyPayment({
                paymentId: paymentRecord.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id || order?.orderId || '',
                razorpaySignature: response.razorpay_signature || '',
                plan,
                billing,
                amount
              }, idToken);

              await OmniDB.updatePaymentStatus(
                paymentRecord.id,
                'success',
                response.razorpay_payment_id
              );

              // Upgrade user plan
              await OmniDB.upgradePlan(user.uid, plan, billing);

              // Update local state
              Store.set('plan', plan);
              const userData = Store.get('user');
              if (userData) {
                Store.setUser({ ...userData, plan });
              }

              window.showToast(`Successfully upgraded to ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan!`, 'success');
              resolve(response);
            } catch (err) {
              console.error('Post-payment error:', err);
              window.showToast('Payment received but plan update failed. Contact support.', 'error');
              reject(err);
            }
          },
          prefill: {
            name: user.displayName || '',
            email: user.email || '',
          },
          theme: {
            color: '#6C5CE7'
          },
          modal: {
            ondismiss: async function () {
              await OmniDB.updatePaymentStatus(paymentRecord.id, 'cancelled');
              window.showToast('Payment cancelled.', 'warning');
              reject(new Error('Payment cancelled'));
            }
          }
        };

        // Check if Razorpay is loaded
        if (typeof Razorpay === 'undefined') {
          window.showToast('Payment gateway not loaded. Please refresh.', 'error');
          reject(new Error('Razorpay not loaded'));
          return;
        }

        const rzp = new Razorpay(options);

        rzp.on('payment.failed', async function (response) {
          await OmniDB.updatePaymentStatus(paymentRecord.id, 'failed');
          window.showToast('Payment failed. Please try again.', 'error');
          reject(new Error(response.error.description || 'Payment failed'));
        });

        rzp.open();
      });
    } catch (err) {
      console.error('Payment initiation error:', err);
      throw err;
    }
  },

  async createOrder(payload, idToken) {
    try {
      const res = await fetch(`${PAYMENT_API_BASE}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Order creation failed');
      return await res.json();
    } catch (err) {
      // Local/static hosting fallback for development. In production, configure
      // Firebase Cloud Functions or your API server for secure order creation.
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        return { orderId: '' };
      }
      throw new Error('Payment order service unavailable. Please try again.');
    }
  },

  async verifyPayment(payload, idToken) {
    try {
      const res = await fetch(`${PAYMENT_API_BASE}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Verification failed');
      const data = await res.json();
      if (!data.verified) throw new Error('Payment verification failed');
      return data;
    } catch (err) {
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        return { verified: true, devFallback: true };
      }
      throw new Error('Payment could not be verified. Your plan was not changed.');
    }
  },

  isPlanUpgrade(current, target) {
    const order = ['free', 'starter', 'pro', 'enterprise'];
    return order.indexOf(target) > order.indexOf(current);
  },

  isPlanDowngrade(current, target) {
    const order = ['free', 'starter', 'pro', 'enterprise'];
    return order.indexOf(target) < order.indexOf(current);
  },

  formatPrice(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  }
};

window.Payments = Payments;

export default Payments;

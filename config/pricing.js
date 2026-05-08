/* ════════════════════════════════════════════════════════════
   OmniTrace — Centralized Pricing Configuration
   Single Source of Truth for plans, limits, and pricing
   ════════════════════════════════════════════════════════════ */

export const PLAN_PRICES = {
  free: { monthly: 0, yearly: 0 },
  starter: { monthly: 99, yearly: 79 },   // Save 20%
  pro: { monthly: 499, yearly: 399 },       // Save 20%
  enterprise: { monthly: null, yearly: null } // Custom
};

export const PLAN_LIMITS = {
  free: { products: 10, analytics: false, api: false, support: 'Community' },
  starter: { products: 100, analytics: true, api: false, support: 'Email' },
  pro: { products: Infinity, analytics: true, api: true, support: 'Priority' },
  enterprise: { products: Infinity, analytics: true, api: true, support: 'Dedicated' }
};

export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    desc: 'For individuals',
    features: [
      { text: '10 products', included: true },
      { text: 'Basic QR tracking', included: true },
      { text: 'Mobile scanning', included: true },
      { text: 'Analytics', included: false },
      { text: 'API Access', included: false }
    ]
  },
  {
    id: 'starter',
    name: 'Starter',
    desc: 'For small teams',
    features: [
      { text: '100 products', included: true },
      { text: 'QR generation', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: 'API Access', included: false }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    desc: 'For growing businesses',
    popular: true,
    features: [
      { text: 'Unlimited products', included: true },
      { text: 'Full QR suite', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access', included: true },
      { text: 'Priority support', included: true },
      { text: 'Webhook integrations', included: true }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    desc: 'For large orgs',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited team', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true }
    ]
  }
];

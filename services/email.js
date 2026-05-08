/* ═══════════════════════════════════════════
   OmniTrace Email Service (EmailJS)
   ═══════════════════════════════════════════ */

// EmailJS Config — Replace with your EmailJS credentials
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID'
};

const EmailService = {

  async sendContactMessage(data) {
    try {
      // Check if emailjs is available
      if (typeof emailjs === 'undefined') {
        // Fallback: simulate sending for development
        console.log('EmailJS not loaded. Contact data:', data);
        return { success: true, simulated: true };
      }

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject || 'New Contact Message',
        message: data.message,
        to_email: 'admin@omnitrace.app'
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      return { success: true, response };
    } catch (err) {
      console.error('Email send error:', err);
      throw new Error('Failed to send message. Please try again.');
    }
  },

  async sendWelcomeEmail(userEmail, userName) {
    try {
      if (typeof emailjs === 'undefined') return;

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        'welcome_template',
        {
          to_email: userEmail,
          to_name: userName,
          message: `Welcome to OmniTrace, ${userName}! Your account is ready.`
        },
        EMAILJS_CONFIG.publicKey
      );
    } catch (err) {
      console.error('Welcome email error:', err);
    }
  }
};

window.EmailService = EmailService;

export default EmailService;

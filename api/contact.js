// Vercel serverless function: emails contact-form messages to Yann via Gmail.
// Secrets live in Vercel → Project → Settings → Environment Variables (never in this file):
//   GMAIL_USER          the Gmail address that sends and receives (theophilentiganzwa@gmail.com)
//   GMAIL_APP_PASSWORD  the 16-character Google app password
const nodemailer = require('nodemailer');

const clean = (v, max) => String(v == null ? '' : v).replace(/\r/g, '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Use POST.' });
  }

  let body = req.body || {};
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }

  // Honeypot: real people never fill this hidden field, bots usually do.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Fill in your name, email and message.' });
  if (!isEmail(email)) return res.status(400).json({ ok: false, error: 'That email address does not look right.' });
  if (message.length < 10) return res.status(400).json({ ok: false, error: 'Write a little more in your message.' });

  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
  if (!user || !pass) return res.status(500).json({ ok: false, error: 'The contact form is not set up yet. Email me directly instead.' });

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });

  try {
    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to: user,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n—\nFrom: ${name} <${email}>\nSent via Yann.vercel.app`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact form send failed:', err && err.message);
    return res.status(502).json({ ok: false, error: 'Your message could not be sent right now. Email me directly instead.' });
  }
};


import { Resend } from 'resend';
import { apiError } from '../utils/apiError.js';

const resend = new Resend(process.env.VERIFY_EMAIL_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Amzei <no-reply@alphacryptvpn.com>',
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.error({ error });
    }

    return data;
  } catch (error) {
    res.status(500).json(
    new apiError(500, 'Failed to send email')
   )
  return console.error('Error sending email:', error);
  }
};

export { sendEmail };
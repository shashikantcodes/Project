import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send email
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const message = {
      from: `${process.env.EMAIL_FROM} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const info = await transporter.sendMail(message);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  welcomeEmail: (name) => ({
    subject: 'Welcome to Project App!',
    message: `
      Hi ${name},
      
      Welcome to Project App! We're excited to have you on board.
      
      Your account has been successfully created and is ready to use.
      
      Best regards,
      The Project Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Project App!</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Welcome to Project App! We're excited to have you on board.</p>
        <p>Your account has been successfully created and is ready to use.</p>
        <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0;">If you have any questions or need help getting started, feel free to reach out to our support team.</p>
        </div>
        <p>Best regards,<br>The Project Team</p>
      </div>
    `
  }),

  emailVerification: (name, verificationUrl) => ({
    subject: 'Verify Your Email Address',
    message: `
      Hi ${name},
      
      Please verify your email address by clicking the link below:
      
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account, please ignore this email.
      
      Best regards,
      The Project Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Verify Your Email Address</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p><small>This link will expire in 24 hours.</small></p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>Best regards,<br>The Project Team</p>
      </div>
    `
  }),

  passwordReset: (name, resetUrl) => ({
    subject: 'Password Reset Request',
    message: `
      Hi ${name},
      
      You requested a password reset. Please click the link below to reset your password:
      
      ${resetUrl}
      
      This link will expire in 10 minutes.
      
      If you didn't request a password reset, please ignore this email.
      
      Best regards,
      The Project Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>You requested a password reset. Please click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${resetUrl}</p>
        <p><small>This link will expire in 10 minutes.</small></p>
        <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
        <p>Best regards,<br>The Project Team</p>
      </div>
    `
  }),

  passwordChanged: (name) => ({
    subject: 'Password Changed Successfully',
    message: `
      Hi ${name},
      
      Your password has been successfully changed.
      
      If you didn't make this change, please contact our support team immediately.
      
      Best regards,
      The Project Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Changed Successfully</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your password has been successfully changed.</p>
        <div style="margin: 30px 0; padding: 20px; background-color: #d4edda; border-radius: 5px; border-left: 4px solid #28a745;">
          <p style="margin: 0; color: #155724;"><strong>Security Notice:</strong> If you didn't make this change, please contact our support team immediately.</p>
        </div>
        <p>Best regards,<br>The Project Team</p>
      </div>
    `
  })
};

export default sendEmail;

import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

if (!process.env.EMAIL_HOST) console.error("❌ EMAIL_HOST missing");
if (!process.env.EMAIL_USER) console.error("❌ EMAIL_USER missing");
if (!process.env.EMAIL_PASS) console.error("❌ EMAIL_PASS missing");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error) => {
  if (error) console.error("❌ Email server connection failed:", error.message);
});

/* ================================
   Templates
================================ */

const buildTemplate = (type, data = {}) => {
  const base = (content) => `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#111827;padding:28px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">GoFixy</h1>
      </div>
      <div style="padding:32px;">
        ${content}
      </div>
      <div style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
        <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
          GoFixy Ltd · support@gofixy.com · This is an automated message.
        </p>
      </div>
    </div>
  `;

  switch (type) {

    case "otpReset":
      return {
        subject: "Your Password Reset OTP — GoFixy",
        html: base(`
          <h2 style="color:#111827;margin-top:0;">Password Reset Request</h2>
          <p style="color:#6b7280;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="background:#f3f4f6;border-radius:10px;padding:24px;text-align:center;margin:24px 0;">
            <span style="font-size:36px;font-weight:800;letter-spacing:10px;color:#111827;">${data.otp}</span>
          </div>
          <p style="color:#9ca3af;font-size:13px;">If you didn't request this, please ignore this email.</p>
        `),
      };

    case "welcome":
      return {
        subject: "Welcome to GoFixy ",
        html: base(`
          <h2 style="color:#111827;margin-top:0;">Welcome, ${data.name}!</h2>
          <p style="color:#6b7280;">Your account has been successfully created. We're glad to have you on board.</p>
          <a href="${process.env.NEXT_PUBLIC_URL || "#"}" style="display:inline-block;margin-top:16px;background:#111827;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
            Browse Services
          </a>
        `),
      };

    case "bookingCreated":
      return {
        subject: `Booking Confirmed — #${data.bookingNumber}`,
        html: base(`
          <h2 style="color:#111827;margin-top:0;">Booking Confirmed ✅</h2>
          <p style="color:#6b7280;">Hi <strong>${data.name || "there"}</strong>, your booking has been received.</p>

          <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
            <tr style="background:#f9fafb;">
              <td style="padding:10px 14px;color:#6b7280;font-weight:600;border-bottom:1px solid #e5e7eb;">Order Number</td>
              <td style="padding:10px 14px;color:#111827;font-weight:700;border-bottom:1px solid #e5e7eb;">#${data.bookingNumber}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;color:#6b7280;font-weight:600;border-bottom:1px solid #e5e7eb;">Service</td>
              <td style="padding:10px 14px;color:#111827;border-bottom:1px solid #e5e7eb;">${data.service}</td>
            </tr>
            ${data.date ? `
            <tr style="background:#f9fafb;">
              <td style="padding:10px 14px;color:#6b7280;font-weight:600;">Appointment</td>
              <td style="padding:10px 14px;color:#111827;">${data.date} at ${data.time || ""}</td>
            </tr>` : ""}
          </table>

          <p style="color:#6b7280;font-size:13px;">
            A PDF copy of your order receipt is attached to this email.
            Our team will be in touch shortly to confirm your appointment.
          </p>
        `),
      };

    case "paymentReceived":
      return {
        subject: `Payment Confirmed — £${data.amount}`,
        html: base(`
          <h2 style="color:#111827;margin-top:0;">Payment Received 💳</h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
            <tr style="background:#f9fafb;">
              <td style="padding:10px 14px;color:#6b7280;font-weight:600;border-bottom:1px solid #e5e7eb;">Amount</td>
              <td style="padding:10px 14px;color:#111827;font-weight:700;border-bottom:1px solid #e5e7eb;">£${data.amount}</td>
            </tr>
            <tr>
              <td style="padding:10px 14px;color:#6b7280;font-weight:600;">Transaction ID</td>
              <td style="padding:10px 14px;color:#111827;font-family:monospace;">${data.transactionId}</td>
            </tr>
          </table>
        `),
      };

    case "statusUpdate":
      return {
        subject: `Order ${data.orderNumber} — Status Updated`,
        html: base(`
          <h2 style="color:#111827;margin-top:0;">Order Status Updated</h2>
          <p style="color:#6b7280;">Your order <strong>#${data.orderNumber}</strong> status has been updated to:</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin:20px 0;display:inline-block;">
            <span style="font-size:16px;font-weight:800;color:#15803d;text-transform:uppercase;">${data.status}</span>
          </div>
          <p style="color:#9ca3af;font-size:13px;">If you have any questions, contact us at support@gofixy.com</p>
        `),
      };
    case "ownerBookingAlert":
      return {
        subject: ` New Booking — #${data.bookingNumber}`,
        html: base(`
      <h2 style="color:#111827;margin-top:0;">New Booking Received</h2>
      <p style="color:#6b7280;">
        A new booking has been placed. Check details below:
      </p>

      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
        <tr style="background:#f9fafb;">
          <td style="padding:10px 14px;font-weight:600;">Booking ID</td>
          <td style="padding:10px 14px;font-weight:700;">#${data.bookingNumber}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;">Customer</td>
          <td style="padding:10px 14px;">${data.name}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:10px 14px;font-weight:600;">Phone</td>
          <td style="padding:10px 14px;">${data.phone}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;">Service</td>
          <td style="padding:10px 14px;">${data.service}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:10px 14px;font-weight:600;">Date & Time</td>
          <td style="padding:10px 14px;">${data.date} ${data.time}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;font-weight:600;">Address</td>
          <td style="padding:10px 14px;">${data.address}</td>
        </tr>
      </table>
    `),
      };
    default:
      return {
        subject: "Notification from GoFixy",
        html: base(`<p style="color:#6b7280;">${data.message || "You have a new notification."}</p>`),
      };
  }
};

/* ================================
   Send Email
================================ */

export const sendEmail = async ({ to, type, data, attachments = [] }) => {
  try {
    const template = buildTemplate(type, data);

    await transporter.sendMail({
      from: `"GoFixy" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html,
      attachments, // [{ filename, content (Buffer), contentType }]
    });

    console.log(`📩 Email [${type}] sent to ${to}`);
  } catch (error) {
    console.error("❌ Email failed:", error.message);
    throw new Error("Email could not be sent");
  }
};
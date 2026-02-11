/**
 * Send email from Next.js API (e.g. welcome + OTP).
 * Uses SMTP from env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM_ADDRESS, EMAIL_FROM_NAME.
 */

import nodemailer from "nodemailer";

const fromName = process.env.EMAIL_FROM_NAME || "Tradeware";
const fromAddress = process.env.EMAIL_FROM_ADDRESS || process.env.SMTP_USER || "";

function getTransporter(): nodemailer.Transporter | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false,
    auth: { user, pass },
  });
}

export async function sendWelcomeEmailWithOtp(to: string, name: string, otp: string): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return; // SMTP not configured; skip sending
  const subject = "Welcome to Tradeware – Your verification OTP";
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="background: linear-gradient(135deg, #0e7490 0%, #155e75 100%); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 24px;">Tradeware</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Vehicle Import & Auctions</p>
  </div>
  <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 32px;">
    <p style="margin: 0 0 16px 0;">Hello <strong>${escapeHtml(name)}</strong>,</p>
    <p style="margin: 0 0 24px 0;">Thank you for signing up. Use the OTP below to verify your email when needed:</p>
    <div style="background: #f0fdfa; border: 2px dashed #0d9488; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
      <span style="font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #0f766e;">${otp}</span>
    </div>
    <p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280;">This code is valid for 10 minutes. You can sign in with your email and password at any time.</p>
    <p style="margin: 24px 0 0 0; font-size: 13px; color: #6b7280;">If you didn't create an account, you can ignore this email.</p>
    <p style="margin: 24px 0 0 0;">Best regards,<br/><strong>Tradeware Team</strong></p>
  </div>
</body>
</html>
  `.trim();
  const text = `Hello ${name},\n\nThank you for signing up at Tradeware. Your verification OTP is: ${otp}\n\nThis code is valid for 10 minutes. You can sign in with your email and password at any time.\n\nBest regards,\nTradeware Team`;

  await transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    text,
    html,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactInquiryData = {
  name: string;
  email: string;
  phone?: string;
  country?: string;
  vehicleId?: string;
  subject?: string;
  message: string;
};

/** Send contact form submission to one or more recipient emails. */
export async function sendContactInquiryEmail(
  toEmails: string[],
  data: ContactInquiryData
): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) return;
  const to = toEmails.filter(Boolean).join(", ");
  if (!to) return;
  const subjectLabels: Record<string, string> = {
    quote: "REQUEST QUOTATION",
    inquiry: "ASSET INQUIRY",
    shipping: "LOGISTICS QUERY",
    import: "IMPORT ARCHITECTURE",
    other: "MISCELLANEOUS",
  };
  const subjectLabel = data.subject ? subjectLabels[data.subject] || data.subject : "Contact";
  const subject = `[Tradeware] ${subjectLabel} – ${escapeHtml(data.name)}`;
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Country", data.country || "—"],
    ["Stock ID", data.vehicleId || "—"],
    ["Subject", data.subject || "—"],
    ["Message", data.message],
  ];
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="background: linear-gradient(135deg, #0e7490 0%, #155e75 100%); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 24px;">New Contact Inquiry</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Tradeware</p>
  </div>
  <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; padding: 32px;">
    <table style="width: 100%; border-collapse: collapse;">
      ${rows.map(([label, value]) => `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #6b7280; width: 120px;">${escapeHtml(label)}</td><td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${escapeHtml(String(value))}</td></tr>`).join("")}
    </table>
    <p style="margin: 24px 0 0 0; font-size: 13px; color: #6b7280;">Reply to: <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
  </div>
</body>
</html>
  `.trim();
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n") + `\n\nReply to: ${data.email}`;
  await transporter.sendMail({
    from: `"${fromName}" <${fromAddress}>`,
    to,
    subject,
    text,
    html,
    replyTo: data.email,
  });
}

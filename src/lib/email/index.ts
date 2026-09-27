import "server-only";
import nodemailer from "nodemailer";

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
};

function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
  );
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends the contact-form submission to the studio inbox. Returns false
 * (without throwing) when SMTP isn't configured, so the form can still
 * record the lead in the database and confirm receipt to the visitor.
 */
export async function sendContactNotification(payload: ContactPayload) {
  if (!isEmailConfigured()) return false;

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER!;
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER!;

  const transporter = getTransporter();

  await transporter.sendMail({
    to,
    from: `Margin of Error Website <${from}>`,
    replyTo: payload.email,
    subject: `New project inquiry from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.company ? `Company: ${payload.company}` : null,
      payload.budget ? `Budget: ${payload.budget}` : null,
      "",
      payload.message,
    ]
      .filter(Boolean)
      .join("\n"),
    html: `
      <div style="font-family: sans-serif; font-size: 14px; color: #111;">
        <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
        ${payload.budget ? `<p><strong>Budget:</strong> ${escapeHtml(payload.budget)}</p>` : ""}
        <p style="white-space: pre-wrap; margin-top: 16px;">${escapeHtml(payload.message)}</p>
      </div>
    `,
  });

  return true;
}

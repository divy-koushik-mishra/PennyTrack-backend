import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Sends a reminder email.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The text content of the email.
 * @returns {Promise<void>}
 */

const sendReminderEmail = asyncHandler(async (toEmail, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: toEmail,
      subject,
      text,
    });
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
});

export { sendReminderEmail };

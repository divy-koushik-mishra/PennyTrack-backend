import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/asyncHandler.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ".",
    pass: ".",
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
      from: "divysuggests@gmail.com",
      to: toEmail,
      subject,
      text,
    });
    console.log("Reminder email sent successfully");
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
});

export { sendReminderEmail };

// src/utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,     // e.g. smtp.gmail.com
  port: process.env.MAIL_PORT,     // 587 (tls) or 465 (ssl)
  secure: process.env.MAIL_SECURE === "true", 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// For checking connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Server Error:", error);
  } else {
    console.log("📧 Mail Server Ready To Send Messages");
  }
});

export const sendMail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `"Creative AI" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return { status: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("❌ Email Sending Failed:", err.message);
    return { status: false, message: "Email sending failed" };
  }
};

export default transporter;

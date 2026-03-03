import transporter from "./mailer.js"; // ✅ default import
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM_NAME || "My App",
      to,
      subject,
      html
    });

    // console.log("📧 Email sent to:", to);
    return true;

  } catch (err) {
    console.log("❌ Email sending error:", err.message);
    return false;
  }
};

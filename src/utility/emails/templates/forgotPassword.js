import { emailLayout } from "../layout.js";

export const forgotPasswordTemplate = (resetLink) =>
  emailLayout(
    "Reset Your Password",
    `
      <p style="text-align:center;margin-top:0;">
        Hi 👋,
      </p>

      <p style="text-align:center;">
        We received a request to reset your account password.
        Click the button below to set a new password.
      </p>

      <div style="text-align:center; margin:32px 0;">
        <a 
          href="${resetLink}" 
          style="
            display:inline-block;
            padding:14px 28px;
            background:#4f46e5;
            color:#ffffff;
            font-weight:600;
            text-decoration:none;
            border-radius:8px;
            font-size:15px;
          ">
          Reset Password
        </a>
      </div>

      <p style="text-align:center;">
        This link will expire in <b>15 minutes</b> for security reasons.
      </p>

      <p style="
        text-align:center;
        margin-top:24px;
        color:#6b7280;
        font-size:14px;
      ">
        If you did not request a password reset, you can safely ignore this email.
      </p>
    `
  );


import { emailLayout } from "../layout.js";

export const verifyEmailTemplate = (verifyLink) =>
  emailLayout(
    "Confirm Your Email Address",
    `
      <p style="margin-top:0;">
        Hello,
      </p>

      <p>
        Thank you for registering with us.
        To complete your account setup, please confirm your email address by clicking the button below.
      </p>

      <div style="text-align:center; margin:32px 0;">
        <a href="${verifyLink}"
           style="
             display:inline-block;
             padding:14px 28px;
             background:#2563eb;
             color:#ffffff;
             font-weight:600;
             text-decoration:none;
             border-radius:8px;
             font-size:15px;
           ">
           Verify Email Address
        </a>
      </div>

      <p style="font-size:14px;color:#4b5563;">
        This verification link is valid for a limited time.
        If you did not create an account with us, you can safely ignore this email.
      </p>
    `
  );


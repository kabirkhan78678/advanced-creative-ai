import dotenv from "dotenv";
dotenv.config();

export const emailLayout = (title, content) => {
  const logo = process.env.EMAIL_LOGO_URL || "";
  const appName = process.env.EMAIL_FROM_NAME || "Your App";

  return `
  <div style="background:#f4f6f8;padding:30px 12px;">
    <div style="
      max-width:560px;
      margin:auto;
      background:#ffffff;
      border-radius:14px;
      font-family:Arial,Helvetica,sans-serif;
      box-shadow:0 6px 20px rgba(0,0,0,0.06);
      overflow:hidden;
    ">

      ${
        logo
          ? `
          <div style="text-align:center;padding:24px 20px 10px;">
            <img src="${logo}" alt="${appName}" style="height:48px;" />
          </div>
          `
          : ""
      }

      <div style="padding:10px 32px 30px;">
        <h2 style="
          text-align:center;
          color:#111827;
          font-size:22px;
          margin:10px 0 20px;
        ">
          ${title}
        </h2>

        <div style="
          color:#374151;
          font-size:15px;
          line-height:1.6;
        ">
          ${content}
        </div>
      </div>

      <div style="
        border-top:1px solid #e5e7eb;
        padding:16px 20px;
        text-align:center;
        font-size:12px;
        color:#6b7280;
        background:#fafafa;
      ">
        © ${new Date().getFullYear()} ${appName}. All rights reserved.
      </div>

    </div>
  </div>
  `;
};

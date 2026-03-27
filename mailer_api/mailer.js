import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function sendMail(email, password) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const FRONTEND_URL = process.env.FRONTEND_URL ||  "http://localhost:3000";
    const verifyLink = `${FRONTEND_URL}/vemail/${email}`;
    const year = new Date().getFullYear();

    const mailOptions = {
        from: '"Capital Collateral" <hardiksingnath@gmail.com>',
        to: email,
        subject: 'Welcome to Capital Collateral — Verify Your Account',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Welcome to Capital Collateral</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#0f172a;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">

    <table width="600" cellpadding="0" cellspacing="0"
      style="background:#ffffff;border-radius:12px;overflow:hidden;
             border:1px solid #e2e8f0;box-shadow:0 4px 24px rgba(15,23,42,0.05);max-width:600px;width:100%;">

      <!-- Top bar -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#2563eb,#3b82f6 50%,#2563eb);"></td>
      </tr>

      <!-- Header -->
      <tr>
        <td style="background:#ffffff;padding:28px 48px 24px;border-bottom:1px solid #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="width:38px;height:38px;background:linear-gradient(135deg,#3b82f6,#60a5fa);border-radius:9px;display:inline-block;text-align:center;line-height:38px;font-size:14px;font-weight:900;color:#ffffff;box-shadow:0 4px 10px rgba(59,130,246,0.3);">CC</div>
                    </td>
                    <td style="padding-left:12px;vertical-align:middle;">
                      <div style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Capital Collateral</div>
                      <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-top:2px;">Network Verification</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td align="right">
                <span style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);color:#3b82f6;font-size:11px;font-weight:700;padding:6px 14px;border-radius:100px;">WELCOME</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="background:#f8fafc;padding:36px 48px 32px;border-bottom:1px solid #e2e8f0;">
          <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Identity Registered ✓</div>
          <h1 style="margin:0 0 10px;font-size:26px;font-weight:800;color:#0f172a;line-height:1.2;letter-spacing:-0.5px;">Welcome to the Vault</h1>
          <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6;">Your node is secured within the registry. One final step — verify your credentials to initialize access.</p>
        </td>
      </tr>

      <!-- Credentials -->
      <tr>
        <td style="padding:32px 48px;background:#ffffff;">
          <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Decrypted Credentials</div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 5px rgba(0,0,0,0.02);">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 16px;border-bottom:1px solid #f1f5f9;">
                  <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px;">Endpoint (Email)</div>
                  <div style="font-size:14px;color:#0f172a;font-family:'Courier New',monospace;font-weight:600;word-break:break-all;">${email}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 16px;">
                  <div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;margin-bottom:4px;">Auto-Generated Key</div>
                  <div style="font-size:14px;color:#0f172a;font-family:'Courier New',monospace;font-weight:600;">${password}</div>
                </td>
              </tr>
            </table>
          </div>

          <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;padding:12px 14px;font-size:13px;color:#9a3412;line-height:1.5;">
            ⚠️ <strong>Action Required:</strong> Change this key immediately upon first access.
          </div>

          <!-- Primary button -->
          <div style="margin-top:28px;text-align:center;">
            <a href="${verifyLink}" style="display:inline-block;padding:14px 32px;background:var(--accent-gradient, linear-gradient(135deg,#3b82f6,#60a5fa));color:white;font-size:15px;font-weight:700;text-decoration:none;border-radius:8px;box-shadow:0 4px 12px rgba(59,130,246,0.3);">Initialize Connection</a>
          </div>

          <!-- Fallback URL -->
          <div style="margin-top:28px;font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px;">Link Parse Error?</div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:12px;">
            <div style="font-size:11px;color:#64748b;margin-bottom:6px;">Manually trace URL:</div>
            <div style="font-size:11px;color:#3b82f6;word-break:break-all;font-family:'Courier New',monospace;line-height:1.5;">${verifyLink}</div>
          </div>
        </td>
      </tr>

      <!-- Security strip -->
      <tr>
        <td style="background:#f1f5f9;border-top:1px solid #e2e8f0;padding:16px 48px;text-align:center;">
          <span style="font-size:12px;color:#64748b;">🔒 256-bit SSL &nbsp;·&nbsp; Sent securely to ${email}</span>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#ffffff;padding:28px 48px;border-top:1px solid #f1f5f9;">
          <table width="100%" cellpadding="0" cellspacing="0">
             <tr>
              <td style="vertical-align:middle;text-align:center;">
                 <div style="font-size:14px;font-weight:800;color:#0f172a;margin-bottom:6px;">Capital Collateral</div>
                 <div style="font-size:12px;color:#64748b;">Global Vault Asset Management</div>
                 <div style="margin-top:16px;font-size:11px;color:#94a3b8;">© ${year} Capital Collateral. All rights reserved.</div>
              </td>
             </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
  </table>

</body>
</html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendMail;
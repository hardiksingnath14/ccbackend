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

    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
    const verifyLink   = `${FRONTEND_URL}/vemail/${email}`;
    const year       = new Date().getFullYear();

    let mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Welcome to Capital Collateral — Verify Your Account',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Welcome to Capital Collateral</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 16px;">
  <tr><td align="center">

    <table width="600" cellpadding="0" cellspacing="0"
      style="background:#ffffff;border-radius:12px;overflow:hidden;
             box-shadow:0 4px 24px rgba(0,0,0,0.10);max-width:600px;width:100%;">

      <!-- Gold top bar -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#b8860b,#d4a017 30%,#f5cc30 50%,#d4a017 70%,#b8860b);"></td>
      </tr>

      <!-- Header -->
      <tr>
        <td style="background:#1a1700;padding:28px 48px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="width:38px;height:38px;background:linear-gradient(135deg,#d4a017,#f5cc30);border-radius:9px;display:inline-block;text-align:center;line-height:38px;font-size:12px;font-weight:900;color:#121208;">CC</div>
                    </td>
                    <td style="padding-left:10px;vertical-align:middle;">
                      <div style="font-size:16px;font-weight:700;color:#f5ead6;">Capital Collateral</div>
                      <div style="font-size:10px;color:rgba(212,160,23,0.6);text-transform:uppercase;letter-spacing:0.1em;">Trusted Since 2010</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td align="right">
                <span style="background:rgba(212,160,23,0.14);border:1px solid rgba(212,160,23,0.28);color:#d4a017;font-size:11px;font-weight:700;padding:4px 12px;border-radius:100px;">WELCOME EMAIL</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Hero -->
      <tr>
        <td style="background:linear-gradient(135deg,#1c1900,#2a2400);padding:36px 48px 32px;">
          <div style="font-size:11px;font-weight:700;color:rgba(212,160,23,0.55);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">Account Created ✓</div>
          <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">Welcome Aboard!</h1>
          <p style="margin:0 0 20px;font-size:14px;color:#a09070;line-height:1.7;">Your Capital Collateral account is ready. One last step — verify your email to unlock full access.</p>

          <h2 style="margin:0 0 10px;font-size:15px;font-weight:700;color:#f0ead6;">Click on the link below to verify your account....</h2>
          <p style="margin:0 0 16px;">
            <a href="${verifyLink}" style="color:#d4a017;font-size:15px;font-weight:bold;">Click to verify account</a>
          </p>

          <div style="font-size:11px;color:#5a5030;">Link expires in 24 hours</div>
        </td>
      </tr>

      <!-- 3 columns -->
      <tr>
        <td style="background:#fafaf7;border-top:1px solid #e8e4d8;border-bottom:1px solid #e8e4d8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33%" style="padding:18px 22px;border-right:1px solid #e8e4d8;vertical-align:top;text-align:center;">
                <div style="font-size:22px;margin-bottom:5px;">🏆</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;margin-bottom:3px;">Trusted</div>
                <div style="font-size:11px;color:#888;line-height:1.5;">12,000+ verified transactions.</div>
              </td>
              <td width="33%" style="padding:18px 22px;border-right:1px solid #e8e4d8;vertical-align:top;text-align:center;">
                <div style="font-size:22px;margin-bottom:5px;">⚡</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;margin-bottom:3px;">Same-Day</div>
                <div style="font-size:11px;color:#888;line-height:1.5;">Cash offers on gold &amp; electronics.</div>
              </td>
              <td width="33%" style="padding:18px 22px;vertical-align:top;text-align:center;">
                <div style="font-size:22px;margin-bottom:5px;">🔒</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;margin-bottom:3px;">RBI Licensed</div>
                <div style="font-size:11px;color:#888;line-height:1.5;">256-bit SSL. Fully compliant.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Credentials -->
      <tr>
        <td style="padding:32px 48px;background:#ffffff;">
          <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Your Login Credentials</div>
          <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:16px;"></div>

          <div style="background:#fafaf7;border:1px solid #e0d8c0;border-radius:10px;overflow:hidden;margin-bottom:16px;">
            <div style="background:#f5f0e0;border-bottom:1px solid #e0d8c0;padding:9px 16px;">
              <span style="font-size:10px;font-weight:700;color:#8a7030;text-transform:uppercase;letter-spacing:0.08em;">Account Details</span>
            </div>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 16px;border-bottom:1px solid #f0ece0;">
                  <div style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;margin-bottom:3px;">Email</div>
                  <div style="font-size:13px;color:#1a1a1a;font-family:'Courier New',monospace;font-weight:600;word-break:break-all;">${email}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;">
                  <div style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;margin-bottom:3px;">Temporary Password</div>
                  <div style="font-size:13px;color:#1a1a1a;font-family:'Courier New',monospace;font-weight:600;">${password}</div>
                </td>
              </tr>
            </table>
          </div>

          <div style="background:#fff5f5;border:1px solid #fcc;border-radius:6px;padding:11px 14px;font-size:12px;color:#c0302a;line-height:1.6;">
            ⚠️ <strong>Change this password immediately</strong> after your first login.
          </div>
        </td>
      </tr>

      <!-- Security strip -->
      <tr>
        <td style="background:#f5f5f0;border-top:1px solid #e8e4d8;padding:12px 48px;text-align:center;">
          <span style="font-size:11px;color:#999;">🔒 256-bit SSL &nbsp;·&nbsp; We will <strong style="color:#666;">never</strong> ask for your password &nbsp;·&nbsp; Sent to ${email}</span>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a1700;padding:24px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="40%" style="vertical-align:top;padding-right:16px;">
                <div style="font-size:12px;font-weight:800;color:#d4a017;text-transform:uppercase;margin-bottom:5px;">Capital Collateral</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.7;">MG Road, Indore<br/>Madhya Pradesh – 452001</div>
              </td>
              <td width="30%" style="vertical-align:top;padding-right:16px;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;margin-bottom:6px;">Support</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.8;">+91 98765 43210<br/>hello@goldenpawn.in<br/>Mon–Sat: 10am–7pm</div>
              </td>
              <td width="30%" style="vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;margin-bottom:6px;">Legal</div>
                <a href="#" style="font-size:11px;color:#4a4020;text-decoration:none;display:block;line-height:1.9;">Privacy Policy</a>
                <a href="#" style="font-size:11px;color:#4a4020;text-decoration:none;display:block;line-height:1.9;">Terms of Service</a>
              </td>
            </tr>
          </table>
          <div style="margin-top:16px;padding-top:12px;border-top:1px solid rgba(212,160,23,0.10);text-align:center;font-size:10px;color:#3a3010;">
            © ${year} Capital Collateral. All rights reserved.
          </div>
        </td>
      </tr>

      <!-- Bottom gold line -->
      <tr>
        <td style="height:3px;background:linear-gradient(90deg,#b8860b,#f5cc30 50%,#b8860b);"></td>
      </tr>

    </table>

  </td></tr>
  </table>

</body>
</html>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export default sendMail;
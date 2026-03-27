import nodemailer from 'nodemailer';

const ForgetPassword = (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const FRONTEND_URL =  process.env.FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${FRONTEND_URL}/resetpassword/${email}`;
    const year      = new Date().getFullYear();

    const mailOptions = {
        from: '"Capital Collateral" <hardiksingnath@gmail.com>',
        to: email,
        subject: 'Reset Your Password — Capital Collateral',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Reset Your Password</title>
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

      <!-- ── HEADER ── -->
      <tr>
        <td style="background:#ffffff;padding:28px 48px 24px;border-bottom:1px solid #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="width:38px;height:38px;background:linear-gradient(135deg,#3b82f6,#60a5fa);
                                  border-radius:9px;display:inline-block;text-align:center;line-height:38px;
                                  font-size:14px;font-weight:900;color:#ffffff;box-shadow:0 4px 10px rgba(59,130,246,0.3);">CC</div>
                    </td>
                    <td style="padding-left:12px;vertical-align:middle;">
                      <div style="font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.5px;">Capital Collateral</div>
                      <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-top:2px;">Network Verification</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td align="right">
                <span style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);
                             color:#dc2626;font-size:11px;font-weight:700;padding:6px 14px;
                             border-radius:100px;letter-spacing:0.05em;">SECURITY ALERT</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── HERO ── -->
      <tr>
        <td style="background:#f8fafc;padding:36px 48px 32px;border-bottom:1px solid #e2e8f0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;width:75%;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">
                  Password Reset Requested
                </div>
                <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#0f172a;line-height:1.2;letter-spacing:-0.5px;">
                  Reset Your<br/>
                  <span style="color:#2563eb;">Account Password</span>
                </h1>
                <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.6;">
                  We received a request to reset the password for your Capital Collateral vault interface. Click the secure link below to proceed.
                </p>
              <p style="margin:20px 0;">
  <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:var(--accent-gradient, linear-gradient(135deg,#3b82f6,#60a5fa));color:white;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;box-shadow:0 4px 12px rgba(59,130,246,0.3);">
    Update Password ➔
  </a>
</p>
                <div style="margin-top:10px;font-size:11px;color:#64748b;">
                  ⏱ Authorization expires in 30 minutes
                </div>
              </td>
              <td style="vertical-align:middle;text-align:right;width:25%;">
                <div style="font-size:50px;line-height:1;opacity:0.8;">🔐</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── MAIN BODY — two columns ── -->
      <tr>
        <td style="background:#ffffff;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Left: message -->
              <td width="55%" style="padding:36px 24px 36px 48px;vertical-align:top;border-right:1px solid #f1f5f9;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Message</div>

                <p style="margin:0 0 12px;font-size:15px;color:#0f172a;font-weight:600;">
                  Initiated for: <span style="color:#3b82f6;">${email}</span>
                </p>
                <p style="margin:0 0 20px;font-size:14px;color:#475569;line-height:1.6;">
                  Someone (hopefully you) requested a password reset for your Capital Collateral account. Use the secure link to set up your new credentials.
                </p>

                <!-- Safety callout -->
                <div style="background:#fff7ed;border:1px solid #fed7aa;border-left:4px solid #f59e0b;
                            border-radius:6px;padding:12px 14px;font-size:13px;color:#9a3412;line-height:1.5;">
                  If you did <strong>not</strong> request this, ignore this email. Your registry remains secure.
                </div>
              </td>

              <!-- Right: account + fallback -->
              <td width="45%" style="padding:36px 40px 36px 24px;vertical-align:top;background:#f8fafc;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Reset Details</div>

                <!-- Expiry badge -->
                <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;
                            padding:12px;margin-bottom:16px;font-size:12px;color:#0f172a;line-height:1.5;box-shadow:0 2px 5px rgba(0,0,0,0.02);">
                  ⏱ Token valid for <strong>30 mins</strong>
                </div>

                <!-- Fallback -->
                <div style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px;">Button not working?</div>
                <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:6px;padding:12px;">
                  <div style="font-size:11px;color:#64748b;margin-bottom:6px;">Copy and paste this URL:</div>
                  <div style="font-size:11px;color:#3b82f6;word-break:break-all;font-family:'Courier New',monospace;line-height:1.5;">${resetLink}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── SECURITY STRIP ── -->
      <tr>
        <td style="background:#f1f5f9;border-top:1px solid #e2e8f0;padding:16px 48px;text-align:center;">
          <span style="font-size:12px;color:#64748b;">
            🔒 256-bit SSL &nbsp;·&nbsp; We will <strong>never</strong> ask for your password directly.
          </span>
        </td>
      </tr>

      <!-- ── FOOTER ── -->
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
            console.error('Mail error:', error);
            return res.status(500).json({ success: false, message: "Failed to send email. Please try again." });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ success: true, message: "Reset link sent successfully." });
    });
};

export default ForgetPassword;
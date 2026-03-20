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
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
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
<body style="margin:0;padding:0;background-color:#f4f4f0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#1a1a1a;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:32px 16px;">
  <tr><td align="center">

    <table width="600" cellpadding="0" cellspacing="0"
      style="background:#ffffff;border-radius:12px;overflow:hidden;
             box-shadow:0 4px 24px rgba(0,0,0,0.10);max-width:600px;width:100%;">

      <!-- Gold top bar -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#b8860b,#d4a017 30%,#f5cc30 50%,#d4a017 70%,#b8860b);"></td>
      </tr>

      <!-- ── HEADER (dark brand bar) ── -->
      <tr>
        <td style="background:#1a1700;padding:28px 48px 24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="width:38px;height:38px;background:linear-gradient(135deg,#d4a017,#f5cc30);
                                  border-radius:9px;display:inline-block;text-align:center;line-height:38px;
                                  font-size:12px;font-weight:900;color:#121208;">CC</div>
                    </td>
                    <td style="padding-left:10px;vertical-align:middle;">
                      <div style="font-size:16px;font-weight:700;color:#f5ead6;">Capital Collateral</div>
                      <div style="font-size:10px;color:rgba(212,160,23,0.6);text-transform:uppercase;letter-spacing:0.1em;">Trusted Since 2010</div>
                    </td>
                  </tr>
                </table>
              </td>
              <td align="right">
                <span style="background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.3);
                             color:#ef8080;font-size:11px;font-weight:700;padding:4px 12px;
                             border-radius:100px;letter-spacing:0.04em;">SECURITY ALERT</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── HERO ── -->
      <tr>
        <td style="background:linear-gradient(135deg,#1c1200 0%,#2a1a00 100%);padding:36px 48px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;width:68%;">
                <div style="font-size:11px;font-weight:700;color:rgba(239,130,80,0.7);
                            text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">
                  Password Reset Requested
                </div>
                <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#ffffff;
                            line-height:1.2;letter-spacing:-0.4px;">
                  Reset Your<br/>
                  <span style="color:#f5cc30;">Account Password</span>
                </h1>
                <p style="margin:0 0 24px;font-size:14px;color:#9a8060;line-height:1.7;">
                  We received a request to reset the password for your Capital Collateral account. Click the button to set a new password.
                </p>
              <p style="margin:20px 0;">
  <a href="${resetLink}" style="color:#d4a017;font-size:16px;font-weight:bold;">
    👉 Click here to reset your password
  </a>
</p>


                <div style="margin-top:10px;font-size:11px;color:#5a4020;">
                  ⏱ Link expires in 30 minutes
                </div>
              </td>
              <td style="vertical-align:middle;text-align:right;width:32%;">
                <div style="font-size:60px;line-height:1;">🔐</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 3-COLUMN INFO STRIP (light) ── -->
      <tr>
        <td style="background:#fafaf7;border-top:1px solid #e8e4d8;border-bottom:1px solid #e8e4d8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33.33%" style="padding:18px 24px;border-right:1px solid #e8e4d8;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:5px;">⏱️</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">30 Minutes</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">This link expires in 30 minutes. Request a new one if it expires.</div>
              </td>
              <td width="33.33%" style="padding:18px 24px;border-right:1px solid #e8e4d8;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:5px;">🛡️</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">Encrypted</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">256-bit SSL. We will <strong>never</strong> ask for your password directly.</div>
              </td>
              <td width="33.33%" style="padding:18px 24px;vertical-align:top;">
                <div style="font-size:18px;margin-bottom:5px;">🚫</div>
                <div style="font-size:11px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:3px;">Didn't Request?</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">Simply ignore this email. Your password stays unchanged.</div>
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
              <td width="55%" style="padding:36px 24px 36px 48px;vertical-align:top;border-right:1px solid #f0ece0;">
                <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Message</div>
                <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:16px;"></div>

                <p style="margin:0 0 8px;font-size:15px;color:#1a1a1a;font-weight:600;">
                  Hello, <span style="color:#b8860b;">${email}</span>
                </p>
                <p style="margin:0 0 18px;font-size:14px;color:#555;line-height:1.75;">
                  Someone (hopefully you) requested a password reset for your Capital Collateral account. Click the button to choose a new password.
                </p>

                <!-- Safety callout -->
                <div style="background:#fffbf0;border:1px solid #e8d080;border-left:3px solid #d4a017;
                            border-radius:6px;padding:12px 14px;
                            font-size:13px;color:#7a6020;line-height:1.6;">
                  If you did <strong>not</strong> request this, you can safely ignore this email. Your password will remain unchanged.
                </div>
              </td>

              <!-- Right: account + fallback -->
              <td width="45%" style="padding:36px 40px 36px 24px;vertical-align:top;background:#fafaf7;">
                <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">Reset For Account</div>
                <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:16px;"></div>

                <!-- Account card -->
                <div style="background:#ffffff;border:1px solid #e0d8c0;border-radius:8px;
                            padding:14px 16px;margin-bottom:16px;
                            box-shadow:0 2px 8px rgba(0,0,0,0.05);">
                  <div style="font-size:10px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px;">Email</div>
                  <div style="font-size:13px;color:#1a1a1a;font-family:'Courier New',monospace;font-weight:600;word-break:break-all;">${email}</div>
                </div>

                <!-- Expiry badge -->
                <div style="background:#fff5f0;border:1px solid #fac8a0;border-radius:6px;
                            padding:10px 14px;margin-bottom:16px;font-size:12px;color:#c06020;line-height:1.6;">
                  ⏱ This link is valid for <strong>30 minutes</strong> only.
                </div>

                <!-- Fallback -->
                <div style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:6px;">Button not working?</div>
                <div style="background:#f5f5f0;border:1px solid #e0dcd0;border-radius:6px;padding:11px 13px;">
                  <div style="font-size:10.5px;color:#888;margin-bottom:5px;">Copy and paste this URL:</div>
                  <div style="font-size:10px;color:#b8860b;word-break:break-all;font-family:'Courier New',monospace;line-height:1.55;">${resetLink}</div>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── SECURITY STRIP ── -->
      <tr>
        <td style="background:#f5f5f0;border-top:1px solid #e8e4d8;padding:14px 48px;text-align:center;">
          <span style="font-size:12px;color:#999;">
            🔒 256-bit SSL &nbsp;·&nbsp; We will <strong style="color:#666;">never</strong> ask for your password &nbsp;·&nbsp; Sent to ${email}
          </span>
        </td>
      </tr>

      <!-- ── FOOTER ── -->
      <tr>
        <td style="background:#1a1700;padding:28px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="30%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:12px;font-weight:800;color:#d4a017;text-transform:uppercase;margin-bottom:6px;">Capital Collateral</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.7;">MG Road, Indore<br/>Madhya Pradesh – 452001</div>
              </td>
              <td width="23%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px;">Safety</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.8;">🔒 SSL Encrypted<br/>✅ RBI Licensed<br/>⚡ Same-Day</div>
              </td>
              <td width="20%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px;">Legal</div>
                <div style="font-size:11px;line-height:1.9;">
                  <a href="#" style="color:#4a4020;text-decoration:none;display:block;">Privacy Policy</a>
                  <a href="#" style="color:#4a4020;text-decoration:none;display:block;">Terms of Service</a>
                </div>
              </td>
              <td width="27%" style="vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:7px;">Support</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.8;">📞 +91 98765 43210<br/>✉️ hello@goldenpawn.in<br/>🕐 Mon–Sat: 10am–7pm</div>
              </td>
            </tr>
          </table>
          <div style="margin-top:18px;padding-top:12px;border-top:1px solid rgba(212,160,23,0.12);
                      text-align:center;font-size:10.5px;color:#3a3010;">
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
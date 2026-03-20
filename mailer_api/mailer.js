import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MAIL_USER, process.env.MAIL_PASS); // Debug:
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

function sendMail(email, password) {
    if (!email || !password) {
        console.error('sendMail: email and password are required');
        return;
    }  

    const verifyLink = `http://localhost:3000/vemail/${email}`;
    const year       = new Date().getFullYear();

    const mailOptions = {
        from:    '"Capital Collateral" <hardiksingnath@gmail.com>',
        to:      email,
        subject: 'Welcome to Capital Collateral — Verify Your Account',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Welcome to Capital Collateral</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f0;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;color:#1a1a1a;">

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f0;padding:32px 16px;">
  <tr><td align="center">

    <!-- ══════════════════════════════════
         EMAIL CONTAINER — white card
    ══════════════════════════════════ -->
    <table width="600" cellpadding="0" cellspacing="0"
      style="background:#ffffff;border-radius:12px;overflow:hidden;
             box-shadow:0 4px 24px rgba(0,0,0,0.10);max-width:600px;width:100%;">

      <!-- ── GOLD TOP BAR ── -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#b8860b 0%,#d4a017 30%,#f5cc30 50%,#d4a017 70%,#b8860b 100%);"></td>
      </tr>

      <!-- ── HEADER ── -->
      <tr>
        <td style="background:#1a1700;padding:32px 48px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Logo -->
              <td style="vertical-align:middle;">
                <table cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <div style="width:40px;height:40px;background:linear-gradient(135deg,#d4a017,#f5cc30);
                                  border-radius:10px;display:inline-block;text-align:center;line-height:40px;
                                  font-size:13px;font-weight:900;color:#121208;letter-spacing:-0.5px;">CC</div>
                    </td>
                    <td style="padding-left:10px;vertical-align:middle;">
                      <div style="font-size:16px;font-weight:700;color:#f5ead6;letter-spacing:-0.2px;">Capital Collateral</div>
                      <div style="font-size:10px;color:rgba(212,160,23,0.7);text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Trusted Since 2010</div>
                    </td>
                  </tr>
                </table>
              </td>
              <!-- Tag -->
              <td align="right" style="vertical-align:middle;">
                <span style="background:rgba(212,160,23,0.15);border:1px solid rgba(212,160,23,0.3);
                             color:#d4a017;font-size:11px;font-weight:700;padding:4px 12px;
                             border-radius:100px;letter-spacing:0.05em;">WELCOME EMAIL</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── HERO BANNER ── -->
      <tr>
        <td style="background:linear-gradient(135deg,#1c1900 0%,#2a2400 100%);padding:40px 48px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;width:65%;">
                <div style="font-size:11px;font-weight:700;color:rgba(212,160,23,0.6);
                            text-transform:uppercase;letter-spacing:0.12em;margin-bottom:10px;">
                  Account Created ✓
                </div>
                <h1 style="margin:0 0 12px;font-size:30px;font-weight:800;color:#ffffff;
                            line-height:1.2;letter-spacing:-0.5px;">
                  Welcome Aboard,<br/>
                  <span style="color:#f5cc30;">Capital Collateral!</span> 🎉
                </h1>
                <p style="margin:0 0 24px;font-size:14px;color:#a09070;line-height:1.7;">
                  Your account is ready. One last step — verify your email to unlock full access to India's most trusted collateral platform.
                </p>
                <a href="${verifyLink}"
                   style="display:inline-block;padding:14px 36px;
                          background:linear-gradient(135deg,#d4a017,#f5cc30);
                          color:#1a1200;text-decoration:none;border-radius:8px;
                          font-size:15px;font-weight:800;letter-spacing:0.02em;">
                  ✅ &nbsp;Verify My Account
                </a>
                <div style="margin-top:10px;font-size:11px;color:#5a5030;">
                  🔗 Link expires in 24 hours
                </div>
              </td>
              <td style="vertical-align:middle;text-align:right;width:35%;">
                <div style="font-size:64px;line-height:1;">🎉</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── 3-COLUMN FEATURES (light) ── -->
      <tr>
        <td style="background:#fafaf7;border-top:1px solid #e8e4d8;border-bottom:1px solid #e8e4d8;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="33.33%" style="padding:20px 24px;border-right:1px solid #e8e4d8;vertical-align:top;">
                <div style="font-size:22px;margin-bottom:6px;">🏆</div>
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.06em;margin-bottom:4px;">Trusted</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">12,000+ verified transactions across India.</div>
              </td>
              <td width="33.33%" style="padding:20px 24px;border-right:1px solid #e8e4d8;vertical-align:top;">
                <div style="font-size:22px;margin-bottom:6px;">⚡</div>
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.06em;margin-bottom:4px;">Same-Day</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">Cash offers on gold, watches & electronics.</div>
              </td>
              <td width="33.33%" style="padding:20px 24px;vertical-align:top;">
                <div style="font-size:22px;margin-bottom:6px;">🔒</div>
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.06em;margin-bottom:4px;">RBI Licensed</div>
                <div style="font-size:12px;color:#666;line-height:1.5;">256-bit SSL. Fully compliant & secure.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- ── MAIN BODY — two columns ── -->
      <tr>
        <td style="background:#ffffff;padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>

              <!-- Left: message + steps -->
              <td width="54%" style="padding:36px 24px 36px 48px;vertical-align:top;
                                     border-right:1px solid #f0ece0;">

                <!-- Section label -->
                <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.1em;margin-bottom:4px;">Your Message</div>
                <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:16px;"></div>

                <p style="margin:0 0 8px;font-size:15px;color:#1a1a1a;font-weight:600;">
                  Hi, <span style="color:#b8860b;">${email}</span>
                </p>
                <p style="margin:0 0 20px;font-size:14px;color:#555;line-height:1.75;">
                  Thank you for joining <strong style="color:#1a1a1a;">Capital Collateral</strong> — India's premium platform for collateral loans, gold trading, and asset management. Your account is ready.
                </p>

                <!-- Warning callout -->
                <div style="background:#fffbf0;border:1px solid #e8d080;border-left:3px solid #d4a017;
                            border-radius:6px;padding:12px 14px;margin-bottom:22px;
                            font-size:13px;color:#7a6020;line-height:1.6;">
                  🔑 <strong>Important:</strong> Change your password immediately after first login. We will <strong>never</strong> ask for your credentials.
                </div>

                <!-- Steps -->
                <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.1em;margin-bottom:4px;">Getting Started</div>
                <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:14px;"></div>

                <!-- Step 1 -->
                <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;width:100%;">
                  <tr>
                    <td style="vertical-align:top;padding-right:10px;width:28px;">
                      <div style="width:24px;height:24px;border-radius:50%;background:#d4a017;
                                  text-align:center;line-height:24px;font-size:11px;
                                  font-weight:800;color:#1a1200;display:inline-block;">1</div>
                    </td>
                    <td style="font-size:13px;color:#444;line-height:1.6;vertical-align:top;padding-top:3px;">
                      Click <strong style="color:#1a1a1a;">Verify Account</strong> to confirm your email.
                    </td>
                  </tr>
                </table>
                <!-- Step 2 -->
                <table cellpadding="0" cellspacing="0" style="margin-bottom:10px;width:100%;">
                  <tr>
                    <td style="vertical-align:top;padding-right:10px;width:28px;">
                      <div style="width:24px;height:24px;border-radius:50%;background:#d4a017;
                                  text-align:center;line-height:24px;font-size:11px;
                                  font-weight:800;color:#1a1200;display:inline-block;">2</div>
                    </td>
                    <td style="font-size:13px;color:#444;line-height:1.6;vertical-align:top;padding-top:3px;">
                      Log in and <strong style="color:#1a1a1a;">change your password</strong> from Profile Settings.
                    </td>
                  </tr>
                </table>
                <!-- Step 3 -->
                <table cellpadding="0" cellspacing="0" style="width:100%;">
                  <tr>
                    <td style="vertical-align:top;padding-right:10px;width:28px;">
                      <div style="width:24px;height:24px;border-radius:50%;background:#d4a017;
                                  text-align:center;line-height:24px;font-size:11px;
                                  font-weight:800;color:#1a1200;display:inline-block;">3</div>
                    </td>
                    <td style="font-size:13px;color:#444;line-height:1.6;vertical-align:top;padding-top:3px;">
                      Start browsing, listing &amp; trading on <strong style="color:#1a1a1a;">Capital Collateral</strong>.
                    </td>
                  </tr>
                </table>
              </td>

              <!-- Right: credentials -->
              <td width="46%" style="padding:36px 40px 36px 24px;vertical-align:top;background:#fafaf7;">

                <div style="font-size:10px;font-weight:700;color:#b8860b;text-transform:uppercase;
                            letter-spacing:0.1em;margin-bottom:4px;">Your Credentials</div>
                <div style="width:28px;height:2px;background:#d4a017;border-radius:1px;margin-bottom:16px;"></div>

                <!-- Credentials card -->
                <div style="background:#ffffff;border:1px solid #e0d8c0;border-radius:10px;
                            overflow:hidden;margin-bottom:16px;
                            box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                  <!-- Card header -->
                  <div style="background:#f5f0e0;border-bottom:1px solid #e0d8c0;padding:10px 16px;">
                    <div style="display:inline-block;width:8px;height:8px;border-radius:50%;
                                background:#d4a017;vertical-align:middle;"></div>
                    <span style="font-size:10px;font-weight:700;color:#8a7030;text-transform:uppercase;
                                 letter-spacing:0.09em;margin-left:7px;vertical-align:middle;">Login Credentials</span>
                  </div>
                  <!-- Email -->
                  <div style="padding:14px 16px;border-bottom:1px solid #f0ece0;">
                    <div style="font-size:10px;font-weight:700;color:#888;text-transform:uppercase;
                                letter-spacing:0.08em;margin-bottom:4px;">Email Address</div>
                    <div style="font-size:13px;color:#1a1a1a;font-family:'Courier New',monospace;
                                font-weight:600;word-break:break-all;">${email}</div>
                  </div>
                  <!-- Password -->
                  <div style="padding:14px 16px;">
                    <div style="font-size:10px;font-weight:700;color:#888;text-transform:uppercase;
                                letter-spacing:0.08em;margin-bottom:4px;">Temporary Password</div>
                    <div style="font-size:13px;color:#1a1a1a;font-family:'Courier New',monospace;
                                font-weight:600;letter-spacing:0.05em;">${password}</div>
                  </div>
                </div>

                <!-- Change password reminder -->
                <div style="background:#fff5f5;border:1px solid #fcc;border-radius:6px;
                            padding:11px 14px;margin-bottom:16px;font-size:12px;
                            color:#c0302a;line-height:1.6;">
                  ⚠️ <strong>Change this password</strong> after your first login.
                </div>

                <!-- Fallback URL -->
                <div style="font-size:10px;font-weight:700;color:#999;text-transform:uppercase;
                            letter-spacing:0.07em;margin-bottom:6px;">Button not working?</div>
                <div style="background:#f5f5f0;border:1px solid #e0dcd0;border-radius:6px;
                            padding:11px 13px;">
                  <div style="font-size:10.5px;color:#888;margin-bottom:5px;">Paste this URL in your browser:</div>
                  <div style="font-size:10px;color:#b8860b;word-break:break-all;
                              font-family:'Courier New',monospace;line-height:1.55;">${verifyLink}</div>
                </div>
              </td>

            </tr>
          </table>
        </td>
      </tr>

      <!-- ── SECURITY STRIP ── -->
      <tr>
        <td style="background:#f5f5f0;border-top:1px solid #e8e4d8;
                   padding:14px 48px;text-align:center;">
          <span style="font-size:12px;color:#999;line-height:1.6;">
            🔒 256-bit SSL &nbsp;·&nbsp; Capital Collateral will <strong style="color:#666;">never</strong> ask for your password &nbsp;·&nbsp; Sent to ${email}
          </span>
        </td>
      </tr>

      <!-- ── FOOTER ── -->
      <tr>
        <td style="background:#1a1700;padding:28px 48px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <!-- Brand -->
              <td width="30%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:12px;font-weight:800;color:#d4a017;letter-spacing:0.05em;
                            text-transform:uppercase;margin-bottom:6px;">Capital Collateral</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.7;">
                  MG Road, Indore<br/>Madhya Pradesh – 452001<br/>India
                </div>
              </td>
              <!-- Trust -->
              <td width="23%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;
                            letter-spacing:0.08em;margin-bottom:7px;">Trust & Safety</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.8;">
                  🔒 SSL Encrypted<br/>✅ RBI Licensed<br/>⚡ Same-Day Payout
                </div>
              </td>
              <!-- Legal -->
              <td width="20%" style="vertical-align:top;padding-right:20px;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;
                            letter-spacing:0.08em;margin-bottom:7px;">Legal</div>
                <div style="font-size:11px;line-height:1.9;">
                  <a href="#" style="color:#4a4020;text-decoration:none;display:block;">Privacy Policy</a>
                  <a href="#" style="color:#4a4020;text-decoration:none;display:block;">Terms of Service</a>
                  <a href="#" style="color:#4a4020;text-decoration:none;display:block;">Unsubscribe</a>
                </div>
              </td>
              <!-- Support -->
              <td width="27%" style="vertical-align:top;">
                <div style="font-size:10px;font-weight:700;color:#6a5a18;text-transform:uppercase;
                            letter-spacing:0.08em;margin-bottom:7px;">Support</div>
                <div style="font-size:11px;color:#4a4020;line-height:1.8;">
                  📞 +91 98765 43210<br/>
                  ✉️ hello@goldenpawn.in<br/>
                  🕐 Mon–Sat: 10am–7pm
                </div>
              </td>
            </tr>
          </table>
          <!-- Copyright -->
          <div style="margin-top:20px;padding-top:14px;border-top:1px solid rgba(212,160,23,0.12);
                      text-align:center;font-size:10.5px;color:#3a3010;line-height:1.7;">
            © ${year} Capital Collateral. All rights reserved.
          </div>
        </td>
      </tr>

      <!-- Bottom gold line -->
      <tr>
        <td style="height:3px;background:linear-gradient(90deg,#b8860b,#f5cc30 50%,#b8860b);"></td>
      </tr>

    </table>
    <!-- End container -->

  </td></tr>
  </table>

</body>
</html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('sendMail error:', error);
        } else {
            console.log('Welcome email sent:', info.response);
        }
    });
}

export default sendMail;
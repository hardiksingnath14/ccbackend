import nodemailer from 'nodemailer';

const ContactMailer = (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Required fields are missing." });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    const year = new Date().getFullYear();

    const mailOptions = {
        from: `"${name}" <${email}>`, // Note: Gmail might overwrite this with the auth user
        to: process.env.MAIL_USER,
        subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Message from Capital Collateral</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',Helvetica,Arial,sans-serif;color:#0f172a;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px;">
  <tr><td align="center">

    <table width="600" cellpadding="0" cellspacing="0"
      style="background:#ffffff;border-radius:12px;overflow:hidden;
             box-shadow:0 4px 24px rgba(0,0,0,0.05);border:1px solid #e2e8f0;max-width:600px;width:100%;">

      <!-- Top bar -->
      <tr>
        <td style="height:4px;background:linear-gradient(90deg,#2563eb,#3b82f6 50%,#2563eb);"></td>
      </tr>

      <!-- Header -->
      <tr>
        <td style="background:#ffffff;padding:28px 48px 24px;border-bottom:1px solid #f1f5f9;">
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
                      <div style="font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;margin-top:2px;">Network Notification</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:40px 48px;">
          <h2 style="margin:0 0 20px;font-size:20px;font-weight:800;color:#0f172a;">New Inquiry Received</h2>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#475569;">
            You have received a new message through the platform contact interface.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;">
            <tr>
              <td style="padding-bottom:14px;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">From</div>
                <div style="font-size:15px;color:#0f172a;font-weight:600;">${name} <span style="font-weight:400;color:#64748b;">(${email})</span></div>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:14px;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Phone</div>
                <div style="font-size:15px;color:#0f172a;">${phone || 'N/A'}</div>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:14px;">
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Subject</div>
                <div style="font-size:15px;color:#0f172a;font-weight:600;">${subject || 'No Subject'}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div style="font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">Message</div>
                <div style="font-size:15px;color:#334155;line-height:1.6;white-space:pre-wrap;background:#ffffff;padding:12px;border:1px solid #e2e8f0;border-radius:6px;">${message}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f8fafc;padding:24px 48px;text-align:center;border-top:1px solid #f1f5f9;">
          <div style="font-size:12px;color:#64748b;">© ${year} Capital Collateral. All rights reserved.</div>
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
            console.error('Contact mail error:', error);
            return res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
        }
        console.log('Contact email sent:', info.response);
        return res.status(200).json({ success: true, message: "Your message has been sent successfully!" });
    });
};

export default ContactMailer;

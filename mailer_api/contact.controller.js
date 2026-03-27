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
  <title>New Message from Pawn Shop</title>
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
                      <div style="font-size:16px;font-weight:700;color:#f5ead6;">Pawn Shop</div>
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
          <h2 style="margin:0 0 20px;font-size:22px;color:#1a1700;">New Inquiry Received</h2>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4a4a4a;">
            You have received a new message through the website contact form.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf7;border-radius:8px;padding:20px;">
            <tr>
              <td style="padding-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;">From</div>
                <div style="font-size:15px;color:#1a1700;">${name} (${email})</div>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;">Phone</div>
                <div style="font-size:15px;color:#1a1700;">${phone || 'N/A'}</div>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:12px;">
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;">Subject</div>
                <div style="font-size:15px;color:#1a1700;">${subject || 'No Subject'}</div>
              </td>
            </tr>
            <tr>
              <td>
                <div style="font-size:12px;font-weight:700;color:#b8860b;text-transform:uppercase;">Message</div>
                <div style="font-size:15px;color:#1a1700;line-height:1.6;white-space:pre-wrap;">${message}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a1700;padding:24px 48px;text-align:center;">
          <div style="font-size:11px;color:#6a5a18;">© ${year} Pawn Shop. All rights reserved.</div>
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

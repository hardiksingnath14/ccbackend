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

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Link For ForgetPassword PawnShop',
        html: `<h1>Welcome to pawnshop</h1>
               <h2>your link to reset password is attached below</h2>
               <h2>Click on the link below to reset password</h2>
               <a href="https://cpitalcollateralfrontend.onrender.com/${email}">Click to reset password</a>`
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
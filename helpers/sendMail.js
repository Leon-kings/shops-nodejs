import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

const sendMail = async (from, to, subject, html) => {
    const mailOptions = {
        from,
        to,
        subject,
        html,
    };
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Email sent");
        }
    });
};

export default sendMail;

const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const { EMAIL_USER, EMAIL_PASS } = process.env;

async function sendMail(from, text, name) {
    // const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: EMAIL_USER,
        to: "natanael.96.01@gmail.com",
        priority: 'high',
        subject: `ENVIADO DESDE PORTAFOLIO - ${name}`,
        html: `<p>
            ${text}.

            Atte:  ${name} - (${from})
        </p>`
    };
    
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error)
        } else console.log('Email sent: ' + info);
    });
}

router.post("/", async (req, res) => {
    const { email, text, name } = req.body;
    try {
        sendMail(email, text, name);
        res.status(201).send("Mensaje enviado!");
    }catch(error) {
        res.status(404).send(error.message);
    }
});

module.exports = router;
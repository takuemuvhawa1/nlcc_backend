require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');
const nodemailer = require('nodemailer');
const Imap = require('imap');
const { simpleParser } = require('mailparser');

// Gmail credentials
const senderEmail = '@gmail.com';
const senderPassword = ''
const subject = 'New Life Covenant';
const bodyApplicationForm = '';

// Determine which email service to use (Gmail or Titan Mail)
const emailService = process.env.EMAIL_SERVICE || 'gmail'; 

let smtpServer, smtpPort, imapServer, imapPort;

if (emailService === 'gmail') {
    smtpServer = 'smtp.gmail.com';
    smtpPort = 587;
    imapServer = 'imap.gmail.com';
    imapPort = 993;
} else {
    smtpServer = 'smtp.titan.email';
    smtpPort = 587;
    imapServer = 'imap.titan.email';
    imapPort = 993;
}

const crudsObj = {};

crudsObj.sendOtpEmail = (username, user_email, otp) => {
    return new Promise(async (resolve, reject) => {
        const body = `<h2 style='color: blue;'> New Life Covenant Church  </h2> 
                      <p style='color: #000000; margin-top: 33px;'> 
                      Dear ${username}.</p> 
                      We are thrilled to welcome you to our church family! <br> 
                      To help you get started, we've sent you a One-Time <br>
                      Password (OTP) to securely set your password. <br><br>
                      Your OTP is: 
                      <b>${otp}</b>  <br><br>
                      Please enter this code in the app to complete your registration<br> 
                      and gain access to all our features, including <br>
                      event updates, community discussions, and spiritual resources.<br>
                      </p>
                      <p style='margin-top: 25px'><br>
                      <b>Blessings</b><br />
                      <b>New Life Covenant Church	</b><br />
                      https://www.jabulanlcc.org <br /> 
                      147 Robert Mugabe Rd<br />
                      Harare, Zimbabwe<br />
                      </p>`;

        try {
            // Create a nodemailer transporter using SMTP
            const transporter = nodemailer.createTransport({
                host: smtpServer,
                port: smtpPort,
                secure: false, 
                auth: {
                    user: senderEmail,
                    pass: senderPassword,
                },
                tls: {
                    rejectUnauthorized: false 
                }
            });

            // Create the email options
            const mailOptions = {
                from: senderEmail,
                to: user_email,
                subject: subject,
                html: body,
            };

            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully.');
            console.log('Info object:', info);

            resolve({ status: '200', message: 'sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            reject(error);
        }
    });
};

module.exports = crudsObj;
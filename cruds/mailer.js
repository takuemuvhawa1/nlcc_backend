// require('dotenv').config();
// const pool = require('./poolfile');
// const axios = require('axios');
// const nodemailer = require('nodemailer');
// const Imap = require('imap');
// const { simpleParser } = require('mailparser');

// // HostGator credentials
// const senderEmail = 'admin@jabulanlm.co.zw';
// const senderPassword = '$$J4bul4@App$$';
// const subject = 'New Life Covenant';
// const bodyApplicationForm = '';

// // HostGator SMTP settings
// const smtpServer = 'mail.jabulanlm.co.zw'; // HostGator SMTP server
// const smtpPort = 465; // Use 465 for SSL
// const imapServer = 'mail.jabulanlm.co.zw'; // HostGator IMAP server
// const imapPort = 993; // IMAP port

// const crudsObj = {};

// crudsObj.sendOtpEmail = (username, user_email, otp) => {
//     return new Promise(async (resolve, reject) => {
//         const body = `<h2 style='color: blue;'> New Life Covenant Church  </h2> 
//                       <p style='color: #000000; margin-top: 33px;'> 
//                       Dear ${username}.</p> 
//                       We are thrilled to welcome you to our church family! 
//                       To help you get started, we've sent you a <br/> One-Time 
//                       Password (OTP) to securely set your password. <br/><br/>
//                       Your OTP is: 
//                       <b>${otp}</b>  <br><br>
//                       Please enter this code in the app to complete your registration
//                       and gain access to all our features, including <br/>
//                       event updates, nlcc ministries, cell groups and spiritual resources.
//                       </p>
//                       <p style='margin-top: 25px'><br>
//                       <b>Blessings</b><br />
//                       <b>New Life Covenant Church	</b><br />
//                       https://www.jabulanlcc.org <br /> 
//                       147 Robert Mugabe Rd<br />
//                       Harare, Zimbabwe<br />
//                       </p>`;

//         try {
//             // Create a nodemailer transporter using SMTP
//             const transporter = nodemailer.createTransport({
//                 host: smtpServer,
//                 port: smtpPort,
//                 secure: true, // Use true for 465 port
//                 auth: {
//                     user: senderEmail,
//                     pass: senderPassword,
//                 },
//                 tls: {
//                     rejectUnauthorized: false
//                 }
//             });

//             // Create the email options
//             const mailOptions = {
//                 from: senderEmail,
//                 to: user_email,
//                 subject: subject,
//                 html: body,
//             };

//             // Send the email
//             const info = await transporter.sendMail(mailOptions);
//             console.log('Email sent successfully.');
//             console.log('Info object:', info);

//             resolve({ status: '200', message: 'sent successfully' });
//         } catch (error) {
//             console.error('Error sending email:', error);
//             reject(error);
//         }
//     });
// };

// crudsObj.sendOtpEmailForgotPass = (username, user_email, otp) => {
//     return new Promise(async (resolve, reject) => {
//         const body = `<h2 style='color: blue;'> New Life Covenant Church  </h2> 
//                       <p style='color: #000000; margin-top: 33px;'> 
//                       Dear ${username}.</p> 
//                       Please enter the OTP below to verify your identity and reset you password. <br/><br/>
//                       Your OTP is: 
//                       <b>${otp}</b>  <br><br>
//                       </p>
//                       <p style='margin-top: 25px'><br>
//                       <b>Blessings</b><br />
//                       <b>New Life Covenant Church	</b><br />
//                       https://www.jabulanlcc.org <br /> 
//                       147 Robert Mugabe Rd<br />
//                       Harare, Zimbabwe<br />
//                       </p>`;

//         try {
//             // Create a nodemailer transporter using SMTP
//             const transporter = nodemailer.createTransport({
//                 host: smtpServer,
//                 port: smtpPort,
//                 secure: true, // Use true for 465 port
//                 auth: {
//                     user: senderEmail,
//                     pass: senderPassword,
//                 },
//                 tls: {
//                     rejectUnauthorized: false
//                 }
//             });

//             // Create the email options
//             const mailOptions = {
//                 from: senderEmail,
//                 to: user_email,
//                 subject: subject,
//                 html: body,
//             };

//             // Send the email
//             const info = await transporter.sendMail(mailOptions);
//             console.log('Email sent successfully.');
//             console.log('Info object:', info);

//             resolve({ status: '200', message: 'sent successfully' });
//         } catch (error) {
//             console.error('Error sending email:', error);
//             reject(error);
//         }
//     });
// };

// module.exports = crudsObj;

require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');
const nodemailer = require('nodemailer');

// HostGator credentials
const senderEmail = process.env.SENDER_EMAIL;
const senderPassword = process.env.SENDER_PASSWORD;
const subject = 'New Life Covenant';
const bodyApplicationForm = '';

// HostGator SMTP settings
const smtpServer = 'mail.jabulanlm.co.zw'; // HostGator SMTP server
const smtpPort = 465; // Use 465 for SSL

const crudsObj = {};

// Function to create a transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: smtpServer,
        port: smtpPort,
        secure: true, // Use true for 465 port
        auth: {
            user: senderEmail,
            pass: senderPassword,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

crudsObj.sendOtpEmail = (username, user_email, otp) => {
    return new Promise(async (resolve, reject) => {
        const body = `<h2 style='color: blue;'> New Life Covenant Church  </h2> 
                      <p style='color: #000000; margin-top: 33px;'> 
                      Dear ${username}.</p> 
                      We are thrilled to welcome you to our church family! 
                      To help you get started, we've sent you a <br/> One-Time 
                      Password (OTP) to securely set your password. <br/><br/>
                      Your OTP is: 
                      <b>${otp}</b>  <br><br>
                      Please enter this code in the app to complete your registration
                      and gain access to all our features, including <br/>
                      event updates, nlcc ministries, cell groups and spiritual resources.
                      </p>
                      <p style='margin-top: 25px'><br>
                      <b>Blessings</b><br />
                      <b>New Life Covenant Church	</b><br />
                      https://www.jabulanlcc.org <br /> 
                      147 Robert Mugabe Rd<br />
                      Harare, Zimbabwe<br />
                      </p>`;

        try {
            const transporter = createTransporter();
            const mailOptions = {
                from: senderEmail,
                to: user_email,
                subject: subject,
                html: body,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);

            resolve({ status: '200', message: 'sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            reject(error);
        }
    });
};

crudsObj.sendOtpEmailForgotPass = (username, user_email, otp) => {
    return new Promise(async (resolve, reject) => {
        const body = `<h2 style='color: blue;'> New Life Covenant Church  </h2> 
                      <p style='color: #000000; margin-top: 33px;'> 
                      Dear ${username}.</p> 
                      Please enter the OTP below to verify your identity and reset your password. <br/><br/>
                      Your OTP is: 
                      <b>${otp}</b>  <br><br>
                      </p>
                      <p style='margin-top: 25px'><br>
                      <b>Blessings</b><br />
                      <b>New Life Covenant Church	</b><br />
                      https://www.jabulanlcc.org <br /> 
                      147 Robert Mugabe Rd<br />
                      Harare, Zimbabwe<br />
                      </p>`;

        try {
            const transporter = createTransporter();
            const mailOptions = {
                from: senderEmail,
                to: user_email,
                subject: subject,
                html: body,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);

            resolve({ status: '200', message: 'sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            reject(error);
        }
    });
};

module.exports = crudsObj;

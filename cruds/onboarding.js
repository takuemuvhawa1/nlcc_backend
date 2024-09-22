require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');

let crudsObj = {};

crudsObj.searchMember = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Surname FROM members WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }
            const member = results[0]; // Get the user data from the results

            let randNum = '';

            for (let i = 1; i < 5; i++) {
                randNum += (Math.floor(Math.random() * 10)).toString();
            }

            pool.query('UPDATE members SET Otp = ? WHERE email = ?', [randNum, email])

            // Return user data without the password
            const { ...memberData } = member; // Exclude password from user data
            return resolve({ status: '200', message: 'Email found', member: memberData, randNum });

        });
    });
};

crudsObj.setPassword = async (email, otp, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Surname FROM members WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }

            pool.query('UPDATE members SET Password = ? WHERE email = ?', [password, email], async (err, results) => {
                if (err) {
                    return reject(err);
                }

                return resolve({ status: '200', message: 'Password set successfully' });

            });
        })
    });
};

crudsObj.resendOtp = async (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Otp FROM members WHERE email = ?', [email], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }
            const member = results[0]; // Get the user data from the results

            //Email to send otp
            return resolve({ status: '200', message: 'OTP sent successfully' });

        });
    });
};

//Login
crudsObj.signIn = async (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM members WHERE email = ? AND Password = ?', [email, password], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Invalid email or password' });
            }
            const member = results[0];

            const { Password, ...memberData } = member;
            return resolve({ status: '200', message: 'Login successful', member: memberData });

        });
    });
};

module.exports = crudsObj;

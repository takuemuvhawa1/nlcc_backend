require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');
const poolapi = require('./poolapi');

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

             //Email to send otp
             const data = {
                username: member.Name, 
                user_email: email,
                otp: randNum
            };

            try {
                // Send the OTP email
                const response = await axios.post(`${poolapi}/mailer/otp`, data);
                return resolve({ status: '200', message: 'OTP sent successfully', /*emailResponse: response.data*/ });
            } catch (emailErr) {
                console.error('Error sending OTP email:', emailErr);
                return reject({ status: '500', message: 'Failed to send OTP email' });
            }

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

                pool.query('UPDATE members SET Otp = ? WHERE email = ?', [null, email])

                pool.query('SELECT * FROM members WHERE email = ?', [email], async (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    const member = results[0];
                    const { Password, ...memberData } = member;

                    return resolve({ status: '200', message: 'Password set successfully', member: memberData });
                });
            });
        })
    });
};


crudsObj.resetPassword = async (email, oldPassword, newPassword) => {
    return new Promise((resolve, reject) => {
        // Check if the email exists and the old password is valid
        pool.query('SELECT * FROM members WHERE email = ? AND Password = ?', [email, oldPassword], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Invalid email or password' });
            }

            // Update the password
            pool.query('UPDATE members SET Password = ? WHERE email = ?', [newPassword, email], async (err, results) => {
                if (err) {
                    return reject(err);
                }

                // Clear OTP if applicable
                pool.query('UPDATE members SET Otp = ? WHERE email = ?', [null, email]);

                // Fetch updated member info
                pool.query('SELECT * FROM members WHERE email = ?', [email], async (err, results) => {
                    if (err) {
                        return reject(err);
                    }

                    const member = results[0];
                    const { Password, ...memberData } = member;

                    return resolve({ status: '200', message: 'Password reset successfully', member: memberData });
                });
            });
        });
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
            const data = {
                username: member.Name, // Assuming you have a username field
                user_email: email,
                otp: member.Otp
            };

            try {
                // Send the OTP email
                const response = await axios.post(`${poolapi}/mailer/otp`, data);
                return resolve({ status: '200', message: 'OTP sent successfully', /*emailResponse: response.data*/ });
            } catch (emailErr) {
                console.error('Error sending OTP email:', emailErr);
                return reject({ status: '500', message: 'Failed to send OTP email' });
            }


            // return resolve({ status: '200', message: 'OTP sent successfully' });

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

crudsObj.getMinistriesJoin2 = (memberId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
            m.Name AS MinistryName
            FROM 
            ministries m 
            LEFT JOIN 
            memberministries mm ON m.MinistryID = mm.MinistryID 
            WHERE 
            mm.MemberID = ?`;

        pool.query(query, [memberId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

crudsObj.getCellGroupsJoin = (memberId) => {
    return new Promise((resolve, reject) => {
        const query = `
           SELECT 
           sg.Name AS SmallGroupName
           FROM 
           smallgroups sg 
           LEFT JOIN   
           membersmallgroups mg ON sg.SmallGroupID = mg.SmallGroupID 
           WHERE 
           mg.MemberID = ?`;

        pool.query(query, [memberId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

module.exports = crudsObj;

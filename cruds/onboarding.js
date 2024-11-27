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
                const { ...memberData } = member;
                return resolve({ status: '200', message: 'Email found', member: memberData, randNum });
            } catch (emailErr) {
                console.error('Error sending OTP email:', emailErr);
                return reject({ status: '500', message: 'Failed to send OTP email' });
            }

        });
    });
};

//POST Member
crudsObj.postMember = async (name, surname, email, phone, address, country, gender, registerwith) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Surname, Otp FROM members WHERE Email = ?', [email], async (err, results) => {
            if (err) {
                return reject(err);
            }
            // Check if the email is already registered
            if (results.length > 0) {
                const existingUser = results[0];
                if (existingUser.Otp !== null) {
                    // Delete the record if OTP is not null
                    pool.query('DELETE FROM members WHERE Email = ?', [email], (deleteErr) => {

                    });
                } else {
                    return resolve({ status: '401', message: 'User already registered' });
                }
            }


            let randNum = '';

            for (let i = 1; i < 5; i++) {
                randNum += (Math.floor(Math.random() * 10)).toString();
            }


            const memberStatus = "Pending";

            // If email is not found, proceed to insert the new member
            pool.query('INSERT INTO members(Name, Surname, Email, Phone, Address, Country, MembershipStatus, Gender, registerwith , Otp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [name, surname, email, phone, address, country, memberStatus, gender, registerwith, randNum],
                async (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    // let randNum = '';

                    // for (let i = 1; i < 5; i++) {
                    //     randNum += (Math.floor(Math.random() * 10)).toString();
                    // }

                    if (registerwith === "Email") {
                        const data = {
                            username: name,
                            user_email: email,
                            otp: randNum
                        };

                        try {
                            // Send the OTP email
                            const response = await axios.post(`${poolapi}/mailer/otp`, data);
                            return resolve({ status: '200', message: 'Member added successfully', randNum });
                        } catch (emailErr) {
                            console.error('Error sending OTP email:', emailErr);
                            return reject({ status: '500', message: 'Failed to send OTP email' });
                        }
                    }

                    else {
                        // Phone to send OTP
                        const data = {

                            api_id: "API25235946311",
                            api_password: "Password1",
                            sms_type: "P",
                            encoding: "T",
                            sender_id: "NLCC",
                            phonenumber: phone,
                            templateid: null,
                            textmessage: ` Hi ${name}! We welcome you to our church family! \n Your OTP is: ${randNum}
                            `,
                            V1: null,
                            V2: null,
                            V3: null,
                            V4: null,
                            V5: null
                        };

                        try {
                            // Send the OTP email
                            const response = await axios.post(`https://rest.bluedotsms.com/api/SendSMS`, data);
                            return resolve({ status: '200', message: 'Member added successfully', randNum });
                        } catch (emailErr) {
                            console.error('Error sending OTP email:', emailErr);
                            return reject({ status: '500', message: 'Failed to send OTP email' });
                        }
                    }

                });
        });
    });
};
// //POST Member
// crudsObj.postMember = async (name, surname, email, phone, address, country, gender, registerwith) => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT Name, Surname, Otp FROM members WHERE Email = ?', [email], async (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             // Check if the email is already registered
//             if (results.length > 0) {
//                 return resolve({ status: '401', message: 'User already registered' });
//             }

//             const memberStatus = "Active";

//             // If email is not found, proceed to insert the new member
//             pool.query('INSERT INTO members(Name, Surname, Email, Phone, Address, Country, MembershipStatus, Gender, registerwith) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
//             [name, surname, email, phone, address, country, memberStatus, gender, registerwith], 
//             async (err, result) => {
//                 if (err) {
//                     return reject(err);
//                 }

//                 let randNum = '';

//                 for (let i = 1; i < 5; i++) {
//                     randNum += (Math.floor(Math.random() * 10)).toString();
//                 }

//                 // Email to send OTP
//                 const data = {
//                     username: name,
//                     user_email: email,
//                     otp: randNum
//                 };

//                 try {
//                     // Send the OTP email
//                     const response = await axios.post(`${poolapi}/mailer/otp`, data);
//                     return resolve({ status: '200', message: 'Member added successfully', randNum });
//                 } catch (emailErr) {
//                     console.error('Error sending OTP email:', emailErr);
//                     return reject({ status: '500', message: 'Failed to send OTP email' });
//                 }
//             });
//         });
//     });
// };


//Forgot password

crudsObj.forgotPassword = async (email, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Surname FROM members WHERE email = ? OR Phone = ?', [email, phone], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }
            const member = results[0]; // Get the user data from the results
            const sendwith = member.registerwith

            let randNum = '';

            for (let i = 1; i < 5; i++) {
                randNum += (Math.floor(Math.random() * 10)).toString();
            }

            pool.query('UPDATE members SET Otp = ? WHERE email = ? OR Phone = ?', [randNum, email, phone])

            //Email to send otp
            const data = {
                username: member.Name,
                user_email: email,
                otp: randNum
            };

            if (sendwith === "Email") {
                try {
                    // Send the OTP email
                    const response = await axios.post(`${poolapi}/mailer/forgotpassword`, data);
                    const { ...memberData } = member;
                    return resolve({ status: '200', message: 'Email found', member: memberData, randNum });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            } else {
                // Phone to send OTP
                const data = {

                    api_id: "API25235946311",
                    api_password: "Password1",
                    sms_type: "P",
                    encoding: "T",
                    sender_id: "NLCC",
                    phonenumber: phone,
                    templateid: null,
                    textmessage: `Your OTP is: ${otp}
                    `,
                    V1: null,
                    V2: null,
                    V3: null,
                    V4: null,
                    V5: null
                };

                try {
                    // Send the OTP email
                    const response = await axios.post(`https://rest.bluedotsms.com/api/SendSMS`, data);
                    const { ...memberData } = member;
                    return resolve({ status: '200', message: 'Email found', member: memberData, randNum });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            }


        });
    });
};

crudsObj.setPassword = async (email, otp, password, registerwith, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Surname FROM members WHERE email = ? OR Phone = ?', [email, phone], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }

            let membershipStatus = "Active";

            pool.query('UPDATE members SET Password = ?, MembershipStatus = ? WHERE email = ? OR Phone = ?', [password, membershipStatus, email, phone], async (err, results) => {
                if (err) {
                    return reject(err);
                }

                pool.query('UPDATE members SET Otp = ? WHERE email = ? OR Phone = ?', [null, email, phone])

                pool.query('SELECT * FROM members WHERE email = ? OR phone = ?', [email, phone], async (err, results) => {
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


crudsObj.resetPassword = async (email, oldPassword, newPassword, phone) => {
    return new Promise((resolve, reject) => {
        // Check if the email exists and the old password is valid
        pool.query('SELECT * FROM members WHERE (email = ? OR Phone = ?) AND Password = ?', [email, phone, oldPassword], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Invalid email or password' });
            }

            // Update the password
            pool.query('UPDATE members SET Password = ? WHERE email = ? OR Phone = ?', [newPassword, email, phone], async (err, results) => {
                if (err) {
                    return reject(err);
                }

                // Clear OTP if applicable
                pool.query('UPDATE members SET Otp = ? WHERE email = ? OR Phone = ?', [null, email, phone]);

                // Fetch updated member info
                pool.query('SELECT * FROM members WHERE email = ? OR Phone = ?', [email, phone], async (err, results) => {
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


crudsObj.resendOtp = async (email, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Otp FROM members WHERE email = ? OR Phone = ?', [email, phone], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }
            const member = results[0];
            const sendwith = member.registerwith

            if (sendwith === "Email") {
                //Email to send otp
                const data = {
                    username: member.Name,
                    user_email: email,
                    otp: member.Otp
                };

                try {
                    // Send the OTP email
                    const response = await axios.post(`${poolapi}/mailer/otp`, data);
                    return resolve({ status: '200', message: 'OTP sent successfully' });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            } else {
                // Phone to send OTP
                const data = {

                    api_id: "API25235946311",
                    api_password: "Password1",
                    sms_type: "P",
                    encoding: "T",
                    sender_id: "NLCC",
                    phonenumber: phone,
                    templateid: null,
                    textmessage: `Your OTP is: ${member.Otp}
                    `,
                    V1: null,
                    V2: null,
                    V3: null,
                    V4: null,
                    V5: null
                };

                try {
                    // Send the OTP email
                    const response = await axios.post(`https://rest.bluedotsms.com/api/SendSMS`, data);
                    return resolve({ status: '200', message: 'OTP sent successfully' });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            }


        });
    });
};

// Forgot password on forgot password route
crudsObj.resendOtpForgotPassword = async (email, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT Name, Otp FROM members WHERE email = ? OR Phone = ?', [email, phone], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Email not found' });
            }
            const member = results[0];
            const sendwith = member.registerwith

            //Email to send otp
            const data = {
                username: member.Name,
                user_email: email,
                otp: member.Otp
            };

            if(sendwith === "Email"){
                try {
                    // Send the OTP email
                    const response = await axios.post(`${poolapi}/mailer/forgotpassword`, data);
                    return resolve({ status: '200', message: 'OTP sent successfully' });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            }else{
                // Phone to send OTP
                const data = {

                    api_id: "API25235946311",
                    api_password: "Password1",
                    sms_type: "P",
                    encoding: "T",
                    sender_id: "NLCC",
                    phonenumber: phone,
                    templateid: null,
                    textmessage: `Your OTP is: ${member.Otp}
                    `,
                    V1: null,
                    V2: null,
                    V3: null,
                    V4: null,
                    V5: null
                };

                try {
                    // Send the OTP email
                    const response = await axios.post(`https://rest.bluedotsms.com/api/SendSMS`, data);
                    return resolve({ status: '200', message: 'OTP sent successfully' });
                } catch (emailErr) {
                    console.error('Error sending OTP email:', emailErr);
                    return reject({ status: '500', message: 'Failed to send OTP email' });
                }
            }

        });
    });
};

//Login
crudsObj.signIn = async (email, password, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM members WHERE (email = ? OR Phone = ?) AND Password = ?', [email, phone, password], async (err, results) => {
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

require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');

let crudsObj = {};

crudsObj.postUser = (Code, Name, email, Password, IsActive, Role, ProfilePic, DOB, Gender, City, School, SLevel, AccountBalance, PhoneNo) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO tbluser(Code, Name,	email, Password, IsActive, Role, ProfilePic, DOB, Gender, City,	School,	SLevel,	AccountBalance,	PhoneNo	) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [Code, Name, email, Password, IsActive, Role, ProfilePic, DOB, Gender, City, School, SLevel, AccountBalance, PhoneNo], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ statu: '200', message: 'saving successful' });
        })
    })
};

crudsObj.postUser2 = (company_id, branch_id, username, password, role, category, email, notify, activesession, addproperty, editproperty, approverequests, delivery, status, employee_id, company_email, client_profile_id, user_phone, otp) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users(company_id,branch_id,username,password,role,category,email,notify,activesession,addproperty,editproperty,approverequests,delivery,status,client_profile_id, OTP) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [company_id, branch_id, username, password, role, category, email, notify, activesession, addproperty, editproperty, approverequests, delivery, status, client_profile_id, otp], (err, result) => {
            if (err) {
                return reject(err);
            }

            console.log(user_phone);
            console.log(email);

            const originalUrl = `https://sms.vas.co.zw/client/api/sendmessage?apikey=e28bb49ae7204dfe&mobiles=${user_phone}&sms=Hi ${username}! Your Tell Them Message Service account has been activated, you can proceed to login. Your first time password is ${otp}&senderid=softworks`;
            //const originalUrl = `http://196.43.100.209:8901/teleoss/sendsms.jsp?user=Softwork&password=Soft@012&mobiles=${user_phone}&sms=Hi ${username}! Your Tell Them Message Service account has been activated, you can proceed to login. Your first time password is ${otp}&unicode=1&clientsmsid=10001&senderid=Softwork`;
            const response = axios.get(originalUrl);

            return resolve({ status: '200', message: 'saving successful' });
        });
    });
}

crudsObj.getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tbluser', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tbluser WHERE Code = ?', [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.getUserByCred = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tbluser WHERE email = ? AND password = ?', [email, password], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

//Get User By Email
crudsObj.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tbluser WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};

crudsObj.updateUser = (id, name, email, password, isActive, role, profilePic, dob, gender, city, school, sLevel, accountBalance, phoneNo) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE tbluser SET  Name = ?,email = ?,	Password = ?, IsActive = ?,	Role = ?, ProfilePic = ?, DOB = ?,Gender = ?, City = ?,	School = ?,	SLevel = ?,	AccountBalance = ?,	PhoneNo = ? WHERE Code = ?',
            [name, email, password, isActive, role, profilePic, dob, gender, city, school, sLevel, accountBalance, phoneNo, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'update successful' });
            }
        );
    });
};

crudsObj.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM users WHERE tbluser = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
};


module.exports = crudsObj;
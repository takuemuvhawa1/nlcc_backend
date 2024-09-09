require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');

let crudsObj = {};

crudsObj.postUser = (name, surname, email, password, role, phone, address) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (user_name, surname, email, user_password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, surname, email, password, role, phone, address], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'User created successfully' });
            });
    });
};

crudsObj.authenticateUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ? AND user_password = ?', [email, password], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve({ status: '401', message: 'Invalid email or password' });
            }
            const user = results[0]; // Get the user data from the results

            // Return user data without the password
            const { user_password, ...userData } = user; // Exclude password from user data
            return resolve({ status: '200', message: 'Login successful', user: userData });

        });
    });
};


crudsObj.getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

crudsObj.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE user_id = ?', [userId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

crudsObj.updateUser = (id, name, surname, email, password, role, phone, address) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET user_name = ?, surname = ?, email = ?, user_password = ?, role = ?, phone = ?, address = ? WHERE user_id = ?',
            [name, surname, email, password, role, phone, address, id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'User updated successfully' });
            });
    });
};

crudsObj.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM users WHERE user_id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve({ status: '200', message: 'User deleted successfully' });
        });
    });
};

module.exports = crudsObj;

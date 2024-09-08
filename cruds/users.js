require('dotenv').config();
const pool = require('./poolfile');
const axios = require('axios');

let crudsObj = {};

crudsObj.postUser = (name, surname, email, password, role, phone, address) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (name, surname, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [name, surname, email, password, role, phone, address], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'User created successfully' });
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
        pool.query('UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role = ?, phone = ?, address = ? WHERE user_id = ?',
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

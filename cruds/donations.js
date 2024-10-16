require('dotenv').config();
const pool = require('./poolfile');

let donationsObj = {};

donationsObj.postDonation = (date, item, reason, memberId) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO donations(date, item, reason, memberID) VALUES (?, ?, ?, ?)', 
        [date, item, reason, memberId], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Donation record added successfully' });
        });
    });
};

donationsObj.getDonations = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM donations', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

donationsObj.getDonationById = (donationId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM donations WHERE id = ?', [donationId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Get by member ID
donationsObj.getDonationByMemberId = (memberId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM donations WHERE memberID = ?', [memberId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

donationsObj.updateDonation = (donationId, date, item, reason, memberId) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE donations SET date = ?, item = ?, reason = ?, memberID = ? WHERE id = ?',
            [date, item, reason, memberId, donationId], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Donation record updated successfully' });
            });
    });
};

donationsObj.deleteDonation = (donationId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM donations WHERE id = ?', [donationId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Donation record deleted successfully' });
        });
    });
};

module.exports = donationsObj;

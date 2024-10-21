require('dotenv').config();
const pool = require('./poolfile');

const prayersObj = {};

prayersObj.postPrayer = (MemberID, requestnotes) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO prayers(MemberID, requestnotes) VALUES (?, ?)', 
        [MemberID, requestnotes], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Prayer request added successfully' });
        });
    });
};

prayersObj.getPrayers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT p.*, m.name, m.surname FROM prayers p JOIN members m ON m.MemberID = p.MemberID ORDER BY id DESC', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

prayersObj.getPrayerById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM prayers WHERE MemberID = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

prayersObj.updatePrayer = (id, MemberID, requestnotes) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE prayers SET MemberID = ?, requestnotes = ? WHERE id = ?',
            [MemberID, requestnotes, id], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Prayer request updated successfully' });
            });
    });
};

prayersObj.deletePrayer = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM prayers WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Prayer request deleted successfully' });
        });
    });
};

module.exports = prayersObj;

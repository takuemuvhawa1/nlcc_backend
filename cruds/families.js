require('dotenv').config();
const pool = require('./poolfile');

let familiesObj = {};

familiesObj.postFamily = (FamilyName, Address, Phone, Email) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO families(FamilyName, Address, Phone, Email) VALUES (?, ?, ?, ?)', 
        [FamilyName, Address, Phone, Email], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Family added successfully' });
        });
    });
};

familiesObj.getFamilies = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM families', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

familiesObj.getFamilyById = (familyId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM families WHERE FamilyID = ?', [familyId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

familiesObj.updateFamily = (FamilyID, FamilyName, Address, Phone, Email) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE families SET FamilyName = ?, Address = ?, Phone = ?, Email = ? WHERE FamilyID = ?',
            [FamilyName, Address, Phone, Email, FamilyID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Family updated successfully' });
            });
    });
};

familiesObj.deleteFamily = (familyId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM families WHERE FamilyID = ?', [familyId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Family deleted successfully' });
        });
    });
};

module.exports = familiesObj;

require('dotenv').config();
const pool = require('./poolfile');

let memberFamiliesObj = {};

memberFamiliesObj.postMemberFamily = (MemberID, FamilyID, Relationship) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO memberfamilies(MemberID, FamilyID, Relationship) VALUES (?, ?, ?)', 
        [MemberID, FamilyID, Relationship], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member Family added successfully' });
        });
    });
};

memberFamiliesObj.getMemberFamilies = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM memberfamilies', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberFamiliesObj.getMemberFamilyById = (memberFamilyId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM memberfamilies WHERE MemberID = ? AND FamilyID = ?', [memberFamilyId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberFamiliesObj.updateMemberFamily = (MemberID, FamilyID, Relationship) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE memberfamilies SET Relationship = ? WHERE MemberID = ? AND FamilyID = ?',
            [Relationship, MemberID, FamilyID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Member Family updated successfully' });
            });
    });
};

memberFamiliesObj.deleteMemberFamily = (MemberID, FamilyID) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM memberfamilies WHERE MemberID = ? AND FamilyID = ?', [MemberID, FamilyID], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member Family deleted successfully' });
        });
    });
};

module.exports = memberFamiliesObj;

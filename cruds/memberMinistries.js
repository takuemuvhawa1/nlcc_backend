require('dotenv').config();
const pool = require('./poolfile');

let memberMinistriesObj = {};

memberMinistriesObj.postMemberMinistry = (MemberID, MinistryID, StartDate, EndDate, Request) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO memberministries(MemberID, MinistryID, StartDate, EndDate, request) VALUES (?, ?, ?, ?, ?)', 
        [MemberID, MinistryID, StartDate, EndDate, Request], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry added successfully' });
        });
    });
};

memberMinistriesObj.getMemberMinistries = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM memberministries', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberMinistriesObj.getMemberMinistryById = (memberMinistryId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM memberministries WHERE MemberMinistryID = ?', [memberMinistryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberMinistriesObj.updateMemberMinistry = (MemberMinistryID, MemberID, MinistryID, StartDate, EndDate, Request) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE memberministries SET MemberID = ?, MinistryID = ?, StartDate = ?, EndDate = ?, request = ? WHERE MemberMinistryID = ?',
            [MemberID, MinistryID, StartDate, EndDate, Request, MemberMinistryID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Member ministry updated successfully' });
            });
    });
};

memberMinistriesObj.deleteMemberMinistry = (memberMinistryId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM memberministries WHERE MemberMinistryID = ?', [memberMinistryId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry deleted successfully' });
        });
    });
};

module.exports = memberMinistriesObj;

require('dotenv').config();
const pool = require('./poolfile');

let memberMinistriesObj = {};

memberMinistriesObj.postMemberMinistry = (MemberID, MinistryID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO member_ministries(MemberID, MinistryID, StartDate, EndDate) VALUES (?, ?, ?, ?)', 
        [MemberID, MinistryID, StartDate, EndDate], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry added successfully' });
        });
    });
};

memberMinistriesObj.getMemberMinistries = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM member_ministries', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberMinistriesObj.getMemberMinistryById = (memberMinistryId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM member_ministries WHERE MemberMinistryID = ?', [memberMinistryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberMinistriesObj.updateMemberMinistry = (MemberMinistryID, MemberID, MinistryID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE member_ministries SET MemberID = ?, MinistryID = ?, StartDate = ?, EndDate = ? WHERE MemberMinistryID = ?',
            [MemberID, MinistryID, StartDate, EndDate, MemberMinistryID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Member ministry updated successfully' });
            });
    });
};

memberMinistriesObj.deleteMemberMinistry = (memberMinistryId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM member_ministries WHERE MemberMinistryID = ?', [memberMinistryId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry deleted successfully' });
        });
    });
};

module.exports = memberMinistriesObj;

require('dotenv').config();
const pool = require('./poolfile');

let memberSmallGroupsObj = {};

memberSmallGroupsObj.postMemberSmallGroup = (MemberID, SmallGroupID, StartDate, EndDate, Request) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO membersmallgroups(MemberID, SmallGroupID, StartDate, EndDate, Request) VALUES (?, ?, ?, ?, ?)', 
        [MemberID, SmallGroupID, StartDate, EndDate, Request], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member small group added successfully' });
        });
    });
};

memberSmallGroupsObj.getMemberSmallGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM membersmallgroups', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberSmallGroupsObj.getMemberSmallGroupById = (memberSmallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM membersmallgroups WHERE MemberSmallGroupID = ?', [memberSmallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

memberSmallGroupsObj.updateMemberSmallGroup = (MemberSmallGroupID, MemberID, SmallGroupID, StartDate, EndDate, Request) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE membersmallgroups SET MemberID = ?, SmallGroupID = ?, StartDate = ?, EndDate = ?, Request = ? WHERE MemberSmallGroupID = ?',
            [MemberID, SmallGroupID, StartDate, EndDate, Request, MemberSmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Member small group updated successfully' });
            });
    });
};

memberSmallGroupsObj.deleteMemberSmallGroup = (memberSmallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM membersmallgroups WHERE MemberSmallGroupID = ?', [memberSmallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member small group deleted successfully' });
        });
    });
};

module.exports = memberSmallGroupsObj;

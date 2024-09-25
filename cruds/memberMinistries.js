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

//Request to leave
memberMinistriesObj.updateMemberMinistryReqLeave = (MemberID, MinistryID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE memberministries SET Request = "Leave" WHERE MemberID = ? AND MinistryID = ?',
            [MemberID, MinistryID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member ministry updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};

// Approve Join
memberMinistriesObj.updateApproveMemberMinistry = (MemberID, MinistryID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE memberministries SET Request = "Approved" WHERE MemberID = ? AND MinistryID = ?',
            [MemberID, MinistryID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member ministry updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};

// Approve Leave
memberMinistriesObj.updateApproveLeaveMemberMinistry = (MemberID, MinistryID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE memberministries SET Request = "Left" WHERE MemberID = ? AND MinistryID = ?',
            [MemberID, MinistryID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member ministry updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};

// Request to Join a Ministry
memberMinistriesObj.postMemberMinistryReqJoin = (MemberID, MinistryID) => {
    return new Promise((resolve, reject) => {
        const currentDate = getCurrentDate();

        pool.query('INSERT INTO memberministries(MemberID, MinistryID, StartDate, EndDate, Request) VALUES (?, ?, ?, ?, ?)', 
        [MemberID, MinistryID, currentDate, currentDate, null], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry added successfully' });
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

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }


module.exports = memberMinistriesObj;

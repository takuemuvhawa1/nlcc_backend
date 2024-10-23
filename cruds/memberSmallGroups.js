require('dotenv').config();
const pool = require('./poolfile');

let memberSmallGroupsObj = {};

memberSmallGroupsObj.postMemberSmallGroup = (MemberID, SmallGroupID, StartDate, EndDate, Request) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO membersmallgroups(MemberID, SmallGroupID, StartDate, EndDate, Request) VALUES (?, ?, ?, ?, ?)', 
        [MemberID, SmallGroupID, getCurrentDate(), EndDate, Request], 
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

memberSmallGroupsObj.getMemberCellGrpsJoin = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT mm.MemberSmallGroupID, m.MemberID, m.Name, m.Surname, m.Email, m.Phone, m.Address, m.Zone FROM membersmallgroups mm JOIN members m ON m.MemberID = mm.MemberID WHERE mm.SmallGroupID = ? AND m.MembershipStatus != 'Inactive' AND m.MembershipStatus != 'Visitor' AND mm.request = 'Approved'`
            ,[id],(err, results) => {
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

//Request to leave
memberSmallGroupsObj.updateLeaveMemberSmallGroup = (MemberID, SmallGroupID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE membersmallgroups SET Request = "Leave" WHERE MemberID = ? AND SmallGroupID = ?',
            [MemberID, SmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member small group updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};
//Approve Join
memberSmallGroupsObj.updateApproveMemberSmallGroup = (MemberID, SmallGroupID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE membersmallgroups SET Request = "Approved" WHERE MemberID = ? AND SmallGroupID = ?',
            [MemberID, SmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member small group updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};

// Approve Leave
memberSmallGroupsObj.updateApproveLeaveMemberSmallGroup = (MemberID, SmallGroupID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE membersmallgroups SET Request = "Left" WHERE MemberID = ? AND SmallGroupID = ?',
            [MemberID, SmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                if (result.affectedRows > 0) {
                    return resolve({ status: '200', message: 'Member small group updated successfully' });
                } else {
                    return resolve({ status: '404', message: 'No request found to approve or already approved.' });
                }
            });
    });
};

//Request to Join a cell
memberSmallGroupsObj.postMemberSmallGroupReqJoin = (MemberID, SmallGroupID) => {
    return new Promise((resolve, reject) => {

        const currentDate = getCurrentDate();

        pool.query('INSERT INTO membersmallgroups(MemberID, SmallGroupID, StartDate, EndDate) VALUES (?, ?, ?, ?)', 
        [MemberID, SmallGroupID, currentDate, currentDate ], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member small group added successfully' });
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

memberSmallGroupsObj.deleteMemberSmallGroup2 = (id, cellID) => {
    console.log(id)
    console.log(cellID)
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM membersmallgroups WHERE MemberID = ? AND SmallGroupID = ?', [id, cellID], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member small group deleted successfully' });
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

module.exports = memberSmallGroupsObj;

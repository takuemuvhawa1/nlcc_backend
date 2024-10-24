require('dotenv').config();
const pool = require('./poolfile');

let ministryLeadersObj = {};

ministryLeadersObj.postLeader = (MinistryID, LeaderID, StartDate, EndDate, preferred) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO ministryleaders(MinistryID, LeaderID, StartDate, EndDate, preferred) VALUES (?, ?, ?, ?, ?)', 
        [MinistryID, LeaderID, StartDate, EndDate, preferred], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Ministry leader added successfully' });
        });
    });
};

ministryLeadersObj.getLeaders = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministryleaders', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministryLeadersObj.getLeaderById = (leaderId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministryleaders WHERE MinistryLeaderID = ?', [leaderId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// ministryLeadersObj.getByMinistryId = (MinistryID) => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT * FROM ministryleaders WHERE MinistryID = ?', [MinistryID], (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

ministryLeadersObj.getByMinistryId = (MinistryID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT ml.*, mm.Name, mm.Surname, mm.Email, mm.Phone, mm.Address FROM ministryleaders  ml JOIN members mm ON ml.LeaderID = mm.MemberID WHERE MinistryID = ?', [MinistryID], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministryLeadersObj.updateLeader = (MinistryLeaderID, MinistryID, LeaderID, StartDate, EndDate, preferred) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE ministryleaders SET MinistryID = ?, LeaderID = ?, StartDate = ?, EndDate = ?, preferred = ? WHERE MinistryLeaderID = ?',
            [MinistryID, LeaderID, StartDate, EndDate, preferred, MinistryLeaderID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Ministry leader updated successfully' });
            });
    });
};

ministryLeadersObj.deleteLeader = (leaderId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM ministryleaders WHERE MinistryLeaderID = ?', [leaderId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Ministry leader deleted successfully' });
        });
    });
};

ministryLeadersObj.deleteMinistryLeadersJoin = (memberId, ministryId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM ministryleaders WHERE LeaderID = ? AND MinistryID = ?', [memberId, ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Member ministry deleted successfully' });
        });
    });
};

module.exports = ministryLeadersObj;

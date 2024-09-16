require('dotenv').config();
const pool = require('./poolfile');

let ministryLeadersObj = {};

ministryLeadersObj.postLeader = (MinistryID, LeaderID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO ministryleaders(MinistryID, LeaderID, StartDate, EndDate) VALUES (?, ?, ?, ?)', 
        [MinistryID, LeaderID, StartDate, EndDate], 
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

ministryLeadersObj.updateLeader = (MinistryLeaderID, MinistryID, LeaderID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE ministryleaders SET MinistryID = ?, LeaderID = ?, StartDate = ?, EndDate = ? WHERE MinistryLeaderID = ?',
            [MinistryID, LeaderID, StartDate, EndDate, MinistryLeaderID], 
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

module.exports = ministryLeadersObj;

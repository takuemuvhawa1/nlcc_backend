require('dotenv').config();
const pool = require('./poolfile');

let smallGroupLeadersObj = {};

smallGroupLeadersObj.postSmallGroupLeader = (SmallGroupID, LeaderID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO smallgroupleaders(SmallGroupID, LeaderID, StartDate, EndDate) VALUES (?, ?, ?, ?)', 
        [SmallGroupID, LeaderID, StartDate, EndDate], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group leader added successfully' });
        });
    });
};

smallGroupLeadersObj.getSmallGroupLeaders = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroupleaders', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupLeadersObj.getSmallGroupLeaderById = (leaderId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroupleaders WHERE SmallGroupLeaderID = ?', [leaderId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupLeadersObj.updateSmallGroupLeader = (SmallGroupLeaderID, SmallGroupID, LeaderID, StartDate, EndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE smallgroupleaders SET SmallGroupID = ?, LeaderID = ?, StartDate = ?, EndDate = ? WHERE SmallGroupLeaderID = ?',
            [SmallGroupID, LeaderID, StartDate, EndDate, SmallGroupLeaderID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Small group leader updated successfully' });
            });
    });
};

smallGroupLeadersObj.deleteSmallGroupLeader = (leaderId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM smallgroupleaders WHERE SmallGroupLeaderID = ?', [leaderId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group leader deleted successfully' });
        });
    });
};

module.exports = smallGroupLeadersObj;

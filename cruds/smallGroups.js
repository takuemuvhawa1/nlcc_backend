require('dotenv').config();
const pool = require('./poolfile');

let smallGroupsObj = {};

smallGroupsObj.postSmallGroup = (Name, Description, CalendarID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO smallgroups(Name, Description, CalendarID) VALUES (?, ?, ?)', 
        [Name, Description, CalendarID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group added successfully' });
        });
    });
};

smallGroupsObj.getSmallGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroups', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupsObj.getSmallGroupById = (smallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroups WHERE SmallGroupID = ?', [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupsObj.updateSmallGroup = (SmallGroupID, Name, Description, CalendarID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE smallgroups SET Name = ?, Description = ?, CalendarID = ? WHERE SmallGroupID = ?',
            [Name, Description, CalendarID, SmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Small group updated successfully' });
            });
    });
};

smallGroupsObj.deleteSmallGroup = (smallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM smallgroups WHERE SmallGroupID = ?', [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group deleted successfully' });
        });
    });
};

module.exports = smallGroupsObj;

require('dotenv').config();
const pool = require('./poolfile');

let ministriesObj = {};

ministriesObj.postMinistry = (Name, Description, CalendarID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO ministries(Name, Description, CalendarID) VALUES (?, ?, ?)', 
        [Name, Description, CalendarID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Ministry added successfully' });
        });
    });
};

ministriesObj.getMinistries = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministries', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministriesObj.getMinistryById = (ministryId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministries WHERE MinistryID = ?', [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministriesObj.updateMinistry = (MinistryID, Name, Description, CalendarID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE ministries SET Name = ?, Description = ?, CalendarID = ? WHERE MinistryID = ?',
            [Name, Description, CalendarID, MinistryID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Ministry updated successfully' });
            });
    });
};

ministriesObj.deleteMinistry = (ministryId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM ministries WHERE MinistryID = ?', [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Ministry deleted successfully' });
        });
    });
};

module.exports = ministriesObj;

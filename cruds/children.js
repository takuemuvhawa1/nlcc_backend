require('dotenv').config();
const pool = require('./poolfile');

let childrenObj = {};

childrenObj.postChild = (parentID, name, surname, dob, relationship, gender) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO children(parentID, name, surname, dob, relationship, gender) VALUES (?, ?, ?, ?, ?, ?)', 
        [parentID, name, surname, dob, relationship, gender], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Child record added successfully' });
        });
    });
};

childrenObj.getChildren = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM children', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

childrenObj.getChildById = (childId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM children WHERE childID = ?', [childId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

childrenObj.getChildByParentId = (parentID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM children WHERE parentID = ?', [parentID], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

childrenObj.updateChild = (childID, parentID, name, surname, dob, relationship, gender) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE children SET parentID = ?, name = ?, surname = ?, dob = ?, relationship = ?, gender = ? WHERE childID = ?',
            [parentID, name, surname, dob, relationship, gender, childID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Child record updated successfully' });
            });
    });
};

childrenObj.deleteChild = (childId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM children WHERE childID = ?', [childId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Child record deleted successfully' });
        });
    });
};

module.exports = childrenObj;

require('dotenv').config();
const pool = require('./poolfile');

let childrenObj = {};

// childrenObj.postChild = (parentID, name, surname, dob, relationship, gender) => {
//     console.log("CHILD " + dob)
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO children(parentID, name, surname, dob, relationship, gender) VALUES (?, ?, ?, ?, ?, ?)', 
//         [parentID, name, surname, dob, relationship, gender], 
//         (err, result) => {
//             if (err) return reject(err);
//             return resolve({ status: '200', message: 'Child record added successfully' });
//         });
//     });
// };

// childrenObj.postChild = (parentID, name, surname, dob, relationship, gender) => {

//     // Format the date to YYYY-MM-DD
//     const formattedDob = new Date(dob).toISOString().split('T')[0];

//     return new Promise((resolve, reject) => {
//         pool.query(
//             'INSERT INTO children(parentID, name, surname, dob, relationship, gender) VALUES (?, ?, ?, ?, ?, ?)', 
//             [parentID, name, surname, formattedDob, relationship, gender], 
//             (err, result) => {
//                 if (err) return reject(err);
//                 return resolve({ status: '200', message: 'Child record added successfully' });
//             }
//         );
//     });
// };

childrenObj.postChild = (parentID, name, surname, dob, relationship, gender) => {
    console.log("Received DOB: " + dob); // Log the date received

    // Create a Date object
    const dateObj = new Date(dob);
    
    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
        return Promise.reject(new Error("Invalid date format"));
    }

    // Add 1 day to the date
    dateObj.setDate(dateObj.getDate() + 1);

    // Format the date to YYYY-MM-DD
    const formattedDob = dateObj.toISOString().split('T')[0];
    console.log("Formatted DOB: " + formattedDob); // Log the formatted date

    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO children(parentID, name, surname, dob, relationship, gender) VALUES (?, ?, ?, ?, ?, ?)', 
            [parentID, name, surname, dob, relationship, gender], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Child record added successfully' });
            }
        );
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

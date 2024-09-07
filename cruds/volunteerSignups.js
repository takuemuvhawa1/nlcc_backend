require('dotenv').config();
const pool = require('./poolfile');

let volunteerSignupsObj = {};

volunteerSignupsObj.postSignup = (OpportunityID, MemberID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO volunteer_signups(OpportunityID, MemberID) VALUES (?, ?)', 
        [OpportunityID, MemberID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer signup added successfully' });
        });
    });
};

volunteerSignupsObj.getSignups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteer_signups', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerSignupsObj.getSignupById = (signupId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteer_signups WHERE SignupID = ?', [signupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerSignupsObj.deleteSignup = (signupId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM volunteer_signups WHERE SignupID = ?', [signupId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer signup deleted successfully' });
        });
    });
};

module.exports = volunteerSignupsObj;

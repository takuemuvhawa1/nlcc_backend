require('dotenv').config();
const pool = require('./poolfile');

let contributionsObj = {};

contributionsObj.postContribution = (MemberID, Date, Amount, Method, PledgeID, ProjectID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO contributions(MemberID, Date, Amount, Method, PledgeID, ProjectID) VALUES (? ,?, ?, ?, ?, ?)', 
        [MemberID, Date, Amount, Method, PledgeID, ProjectID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Contribution added successfully' });
        });
    });
};

contributionsObj.getContributions = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contributions', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

contributionsObj.getContributionById = (contributionId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM contributions WHERE ContributionID = ?', [contributionId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

contributionsObj.updateContribution = (ContributionID, MemberID, Date, Amount, Method, PledgeID, ProjectID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE contributions SET MemberID = ?, Date = ?, Amount = ?, Method = ?, PledgeID = ?, ProjectID = ? WHERE ContributionID = ?',
            [MemberID, Date, Amount, Method, PledgeID, ProjectID, ContributionID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Contribution updated successfully' });
            });
    });
};

contributionsObj.deleteContribution = (contributionId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM contributions WHERE ContributionID = ?', [contributionId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Contribution deleted successfully' });
        });
    });
};

module.exports = contributionsObj;

require('dotenv').config();
const pool = require('./poolfile');

let contributionsObj = {};

contributionsObj.postContribution = (MemberID, Date, Amount, Method, PledgeID, ProjectID, currency,) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO contributions(MemberID, Date, Amount, Method, PledgeID, ProjectID, currency) VALUES (? ,?, ?, ?, ?, ?, ?)', 
        [MemberID, Date, Amount, Method, PledgeID, ProjectID, currency], 
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

contributionsObj.getAllContributionsWithProjects = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT c.ContributionID, c.MemberID, c.Date, c.Amount, c.currency, p.ProjectName, p.Description, m.Name AS memberName, m.Surname As memberSurname
            FROM contributions c
            JOIN projects p ON c.ProjectID = p.ProjectID
            JOIN members m ON c.MemberID = m.MemberID
        `;
        pool.query(query, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};
contributionsObj.getContributionsWithProjects = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT c.ContributionID, c.MemberID, c.Date, c.Amount, c.currency, p.ProjectName, p.Description, m.Name AS memberName, m.Surname As memberSurname
            FROM contributions c
            JOIN projects p ON c.ProjectID = p.ProjectID
            JOIN members m ON c.MemberID = m.MemberID  WHERE c.MemberID = ${id}
        `;
        pool.query(query, (err, results) => {
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

contributionsObj.updateContribution = (ContributionID, MemberID, Date, Amount, Method, PledgeID, ProjectID, currency) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE contributions SET MemberID = ?, Date = ?, Amount = ?, Method = ?, PledgeID = ?, ProjectID = ?, currency = ? WHERE ContributionID = ?',
            [MemberID, Date, Amount, Method, PledgeID, ProjectID, currency, ContributionID], 
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

require('dotenv').config();
const pool = require('./poolfile');

let volunteerOpportunitiesObj = {};

volunteerOpportunitiesObj.postOpportunity = (Name, Date, Time, Location, Description) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO volunteeropportunities(Name, Date, Time, Location, Description) VALUES (?, ?, ?, ?, ?)', 
        [Name, Date, Time, Location, Description], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer opportunity added successfully' });
        });
    });
};

volunteerOpportunitiesObj.getOpportunities = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteeropportunities', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerOpportunitiesObj.getOpportunityById = (opportunityId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteeropportunities WHERE OpportunityID = ?', [opportunityId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerOpportunitiesObj.updateOpportunity = (OpportunityID, Name, Date, Time, Location, Description) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE volunteeropportunities SET Name = ?, Date = ?, Time = ?, Location = ?, Description = ? WHERE OpportunityID = ?',
            [Name, Date, Time, Location, Description, OpportunityID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Volunteer opportunity updated successfully' });
            });
    });
};

volunteerOpportunitiesObj.deleteOpportunity = (opportunityId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM volunteeropportunities WHERE OpportunityID = ?', [opportunityId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer opportunity deleted successfully' });
        });
    });
};

module.exports = volunteerOpportunitiesObj;

require('dotenv').config();
const pool = require('./poolfile');

let pledgesObj = {};

pledgesObj.postPledge = (MemberID, StartDate, EndDate, Amount, Frequency, ProjectID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO pledges(MemberID, StartDate, EndDate, Amount, Frequency, ProjectID) VALUES (?, ?, ?, ?, ?, ?)', 
        [MemberID, StartDate, EndDate, Amount, Frequency, ProjectID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Pledge added successfully' });
        });
    });
};

pledgesObj.getPledges = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pledges', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

pledgesObj.getPledgeById = (pledgeId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pledges WHERE PledgeID = ?', [pledgeId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

pledgesObj.updatePledge = (PledgeID, MemberID, StartDate, EndDate, Amount, Frequency, ProjectID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE pledges SET MemberID = ?, StartDate = ?, EndDate = ?, Amount = ?, Frequency = ?, ProjectID = ? WHERE PledgeID = ?',
            [MemberID, StartDate, EndDate, Amount, Frequency, ProjectID, PledgeID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Pledge updated successfully' });
            });
    });
};

pledgesObj.deletePledge = (pledgeId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM pledges WHERE PledgeID = ?', [pledgeId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Pledge deleted successfully' });
        });
    });
};

module.exports = pledgesObj;

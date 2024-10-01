require('dotenv').config();
const pool = require('./poolfile');

let pledgesObj = {};

pledgesObj.postPledge = (MemberID, StartDate, EndDate, Amount, ProjectID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO pledges(MemberID, StartDate, EndDate, Amount, ProjectID) VALUES ( ?, ?, ?, ?, ?)', 
        [MemberID, StartDate, EndDate, Amount, ProjectID], 
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

pledgesObj.getPledgeByStatus = (status) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM pledges WHERE Status = ?', [status], (err, results) => {
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

pledgesObj.updatePledge = (PledgeID, MemberID, StartDate, EndDate, Amount, ProjectID, Status) => {
    return new Promise((resolve, reject) => {
        const currentDate = getCurrentDate();
        console.log(Status)
        pool.query('UPDATE pledges SET MemberID = ?, StartDate = ?, EndDate = ?, Amount = ?, ProjectID = ?, Status = ? WHERE PledgeID = ?',
            [MemberID, StartDate, EndDate, Amount, ProjectID, Status, PledgeID], 
            (err, result) => {
                if (err) return reject(err);

                if(Status === 'Satisfied'){
                    pool.query('INSERT INTO contributions(MemberID, Date, Amount, PledgeID, ProjectID) VALUES (? ,?, ?, ?, ?)', 
                        [MemberID, currentDate, Amount, PledgeID, ProjectID])
                }

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

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }


module.exports = pledgesObj;

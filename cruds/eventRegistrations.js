require('dotenv').config();
const pool = require('./poolfile');

let eventRegistrationsObj = {};

eventRegistrationsObj.postRegistration = (EventID, MemberID, RSVPStatus) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO event_registrations(EventID, MemberID, RSVPStatus) VALUES (?, ?, ?)', 
        [EventID, MemberID, RSVPStatus], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Registration added successfully' });
        });
    });
};

eventRegistrationsObj.getRegistrations = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM event_registrations', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

eventRegistrationsObj.getRegistrationById = (registrationId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM event_registrations WHERE RegistrationID = ?', [registrationId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

eventRegistrationsObj.updateRegistration = (RegistrationID, EventID, MemberID, RSVPStatus) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE event_registrations SET EventID = ?, MemberID = ?, RSVPStatus = ? WHERE RegistrationID = ?',
            [EventID, MemberID, RSVPStatus, RegistrationID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Registration updated successfully' });
            });
    });
};

eventRegistrationsObj.deleteRegistration = (registrationId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM event_registrations WHERE RegistrationID = ?', [registrationId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Registration deleted successfully' });
        });
    });
};

module.exports = eventRegistrationsObj;

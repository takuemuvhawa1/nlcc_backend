require('dotenv').config();
const pool = require('./poolfile');

let eventsObj = {};

eventsObj.postEvent = (type, theme, description, date, time, enddate, endtime) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO tblevents(type, theme, description, date, time, enddate, endtime) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, theme, description, date, time, enddate, endtime],
            (err, result) => {
                if (err) return reject(err);
                return resolve(result); // Return the result to get the insertId
            });
    });
};

eventsObj.postVolunteerTask = (eventId, task, requirements) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO tblvolunteertasks(event_id, task, requirements) VALUES (?, ?, ?)',
            [eventId, task, requirements],
            (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            });
    });
};

eventsObj.getEvents = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tblevents', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


eventsObj.getEventById = (eventId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tblevents WHERE id = ?', [eventId], (err, results) => {
            if (err) return reject(err);
            return resolve(results[0]); // Return the first event
        });
    });
};

eventsObj.getVolunteerTasksByEventId = (eventId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tblvolunteertasks WHERE event_id = ?', [eventId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

eventsObj.deleteEvent = (eventId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM tblevents WHERE id = ?', [eventId], (err, results) => {
            if (err) return reject(err);
            pool.query('DELETE FROM tblvolunteertasks WHERE event_id = ?', [eventId])
            return resolve({ status: '200', message: 'Event deleted successfully' });
        });
    });
};

module.exports = eventsObj;

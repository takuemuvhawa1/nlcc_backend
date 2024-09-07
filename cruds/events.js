require('dotenv').config();
const pool = require('./poolfile');

let eventsObj = {};

eventsObj.postEvent = (Name, Date, Time, Location, Description, TargetGroupID, TargetType, Recurring, RecurrencePattern, RecurrenceEndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO events(Name, Date, Time, Location, Description, TargetGroupID, TargetType, Recurring, RecurrencePattern, RecurrenceEndDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [Name, Date, Time, Location, Description, TargetGroupID, TargetType, Recurring, RecurrencePattern, RecurrenceEndDate], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Event added successfully' });
        });
    });
};

eventsObj.getEvents = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM events', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

eventsObj.getEventById = (eventId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM events WHERE EventID = ?', [eventId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

eventsObj.updateEvent = (EventID, Name, Date, Time, Location, Description, TargetGroupID, TargetType, Recurring, RecurrencePattern, RecurrenceEndDate) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE events SET Name = ?, Date = ?, Time = ?, Location = ?, Description = ?, TargetGroupID = ?, TargetType = ?, Recurring = ?, RecurrencePattern = ?, RecurrenceEndDate = ? WHERE EventID = ?',
            [Name, Date, Time, Location, Description, TargetGroupID, TargetType, Recurring, RecurrencePattern, RecurrenceEndDate, EventID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Event updated successfully' });
            });
    });
};

eventsObj.deleteEvent = (eventId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM events WHERE EventID = ?', [eventId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Event deleted successfully' });
        });
    });
};

module.exports = eventsObj;

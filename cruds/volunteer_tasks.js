require('dotenv').config();
const pool = require('./poolfile');

let volunteerTasksObj = {};

volunteerTasksObj.postTasks = (event_id, tasks, requirements) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO tblvolunteertasks(event_id, task, requirements) VALUES (?, ?, ?)', 
        [event_id, tasks, requirements], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer opportunity added successfully' });
        });
    });
};

volunteerTasksObj.getTasks = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tblvolunteertasks', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerTasksObj.getTasksJoin = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT t.*, e.type, e.date FROM tblvolunteertasks t JOIN tblevents e ON t.event_id = e.id', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerTasksObj.getTasksById = (opportunityId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM tblvolunteertasks WHERE id = ?', [opportunityId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerTasksObj.updateTasks = (id, event_id, tasks, requirements) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE tblvolunteertasks SET event_id = ?, task = ?, requirements = ? WHERE id = ?',
            [event_id, tasks, requirements, id], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Volunteer opportunity updated successfully' });
            });
    });
};

volunteerTasksObj.deleteTasks = (opportunityId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM tblvolunteertasks WHERE id = ?', [opportunityId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Volunteer opportunity deleted successfully' });
        });
    });
};

module.exports = volunteerTasksObj;

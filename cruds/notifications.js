require('dotenv').config();
const pool = require('./poolfile');

const notificationsObj = {};

notificationsObj.postNotification = (type, theme, date, time) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO notifications(type, theme, date, time) VALUES (?, ?, ?, ?)', 
        [type, theme, date, time], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Notification added successfully' });
        });
    });
};

notificationsObj.getNotifications = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM notifications', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

notificationsObj.getNotificationById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM notifications WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

notificationsObj.updateNotification = (id, type, theme, date, time) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE notifications SET type = ?, theme = ?, date = ?, time = ? WHERE id = ?',
            [type, theme, date, time, id], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Notification updated successfully' });
            });
    });
};

notificationsObj.deleteNotification = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM notifications WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Notification deleted successfully' });
        });
    });
};

module.exports = notificationsObj;

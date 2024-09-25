require('dotenv').config();
const pool = require('./poolfile');

const notificationsObj = {};

notificationsObj.postNotification = (header, content, date, time, MemberID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO notifications(header, content, date, time, MemberID) VALUES (?, ?, ?, ?)', 
        [header, content, date, time, MemberID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Notification added successfully' });
        });
    });
};

notificationsObj.getNotifications = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT n.*, m.Name AS senderName, m.Surname AS senderSurname
FROM notifications n
JOIN members m ON n.MemberID = m.MemberID`, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

notificationsObj.getNotificationById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT n.*, m.Name, m.Surname 
                    FROM notifications n
                    JOIN members m ON n.MemberID = m.MemberID WHERE n.MemberID = ?`, [id], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

notificationsObj.updateNotification = (id, header, content, date, time, MemberID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE notifications SET header = ?, content = ?, date = ?, time = ?, MemberID = ? WHERE id = ?',
            [header, content, date, time, MemberID, id], 
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

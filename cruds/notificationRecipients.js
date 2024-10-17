require('dotenv').config();
const pool = require('./poolfile');

let notificationRecipientsObj = {};

// Add a new recipient
notificationRecipientsObj.addRecipient = (NotificationID, MemberID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)', 
        [NotificationID, MemberID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Recipient added successfully' });
        });
    });
};

// Get all recipients
notificationRecipientsObj.getRecipients = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM notification_recipients', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Get a recipient by ID
notificationRecipientsObj.getRecipientById = (recipientId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM notification_recipients WHERE RecipientID = ?', [recipientId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Get a recipient by member ID
// notificationRecipientsObj.getRecipientByMemberId = (id) => {
//     return new Promise((resolve, reject) => {
//         const all = 0;
//         pool.query('SELECT * FROM notification_recipients WHERE memberID = ? OR memberID = ?', [id, all], (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

// Get a recipient by member ID
notificationRecipientsObj.getRecipientByMemberId = (id) => {
    return new Promise((resolve, reject) => {
        const all = 0;
        pool.query(`SELECT n.recipientID, n.memberID, m.header, m.content, m.date, m.time
                    FROM notification_recipients n
                    JOIN notifications m ON n.notificationID = m.id WHERE n.memberID = ? OR n.memberID = ? ORDER BY n.recipientID DESC`, [id, all], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Update a recipient
notificationRecipientsObj.updateRecipient = (RecipientID, NotificationID, MemberID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE notification_recipients SET NotificationID = ?, MemberID = ? WHERE RecipientID = ?',
            [NotificationID, MemberID, RecipientID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Recipient updated successfully' });
            });
    });
};

// Delete a recipient
notificationRecipientsObj.deleteRecipient = (recipientId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM notification_recipients WHERE RecipientID = ?', [recipientId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Recipient deleted successfully' });
        });
    });
};

module.exports = notificationRecipientsObj;

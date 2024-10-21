require('dotenv').config();
const pool = require('./poolfile');

const notificationsObj = {};

// notificationsObj.postNotification = (header, content, date, time, MemberID, ministryID) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO notifications(header, content, date, time, MemberID, ministryID) VALUES (?, ?, ?, ?, ?, ?)',
//             [header, content, date, time, MemberID, ministryID],
//             (err, result) => {
//                 if (err) return reject(err);
//                 const notificationID = result.insertId

//                 // Get all ministry members
//                 pool.query('Select MemberID FROM memberministries WHERE MinistryID = ? AND request = "Approved"', [ministryID], (err, results) => {
//                     if (err) return reject(err);
//                     console.log(results)
//                     console.log(notificationID)

//                     //Insert recipients
//                     pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
//                         [notificationID, MemberID],
//                         (err, result) => {
//                             if (err) return reject(err);
//                         });
//                 });

//                 return resolve({ status: '200', message: 'Notification added successfully' });
//             });
//     });
// };

// notificationsObj.postNotification = (header, content, date, time, MemberID, ministryID) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO notifications(header, content, date, time, MemberID, ministryID) VALUES (?, ?, ?, ?, ?, ?)',
//             [header, content, date, time, MemberID, ministryID],
//             (err, result) => {
//                 if (err) return reject(err);
//                 const notificationID = result.insertId;
//                 const placeholder = 0;
                
//                 if(ministryID === 0){
//                     pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
//                                 [notificationID, placeholder],
//                                 (err, result) => {
//                                     if (err) return reject(err);
//                                     resolve(result);
//                                 });
//                 }

//                 // Get all ministry members
//                 pool.query('SELECT MemberID FROM memberministries WHERE MinistryID = ? AND request = "Approved"', [ministryID], (err, results) => {
//                     if (err) return reject(err);
//                     console.log(results);
//                     console.log(notificationID);

//                     // Prepare an array of queries for inserting recipients
//                     const recipientQueries = results.map(member => {
//                         return new Promise((resolve, reject) => {
//                             pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
//                                 [notificationID, member.MemberID],
//                                 (err, result) => {
//                                     if (err) return reject(err);
//                                     resolve(result);
//                                 });
//                         });
//                     });

//                     // Execute all recipient insertions
//                     Promise.all(recipientQueries)
//                         .then(() => resolve({ status: '200', message: 'Notification added successfully' }))
//                         .catch(err => reject(err));
//                 });
//             });
//     });
// };

notificationsObj.postNotification = (header, content, date, time, MemberID, ministryID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO notifications(header, content, date, time, MemberID, ministryID) VALUES (?, ?, ?, ?, ?, ?)',
            [header, content, date, time, MemberID, ministryID],
            (err, result) => {
                if (err) return reject(err);
                const notificationID = result.insertId;
                const placeholder = 0;

                // Check if ministryID is 0
                if (ministryID === 0) {
                    pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
                        [notificationID, placeholder],
                        (err, result) => {
                            if (err) return reject(err);
                            return resolve({ status: '200', message: 'Notification added successfully' });
                        });
                } else {
                    // Get all ministry members
                    pool.query('SELECT MemberID FROM memberministries WHERE MinistryID = ? AND request = "Approved"', [ministryID], (err, results) => {
                        if (err) return reject(err);
                        console.log(results);
                        console.log(notificationID);

                        // Prepare an array of queries for inserting recipients
                        const recipientQueries = results.map(member => {
                            return new Promise((resolve, reject) => {
                                pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
                                    [notificationID, member.MemberID],
                                    (err, result) => {
                                        if (err) return reject(err);
                                        resolve(result);
                                    });
                            });
                        });

                        // Execute all recipient insertions
                        Promise.all(recipientQueries)
                            .then(() => resolve({ status: '200', message: 'Notification added successfully' }))
                            .catch(err => reject(err));
                    });
                }
            });
    });
};


notificationsObj.getNotifications = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM notifications ORDER BY id DESC`, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// notificationsObj.getNotifications = () => {
//     return new Promise((resolve, reject) => {
//         pool.query(`SELECT n.*, m.Name AS senderName, m.Surname AS senderSurname
//                     FROM notifications n
//                     JOIN members m ON n.MemberID = m.MemberID`, (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

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

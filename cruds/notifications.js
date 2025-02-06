require('dotenv').config();
const pool = require('./poolfile');

const notificationsObj = {};

// notificationsObj.postNotification = (header, content, date, time, MemberID, ministryID) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO notifications(header, content, date, time, MemberID, ministryID) VALUES (?, ?, ?, ?, ?, ?)',
//             [header, content, date, time, MemberID, ministryID],
//             (err, result) => {
//                 if (err) return reject(err);
//                 const notificationID = result.insertId;
//                 const placeholder = 0;

//                 // Check if ministryID is 0
//                 if (ministryID === 0) {
//                     pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
//                         [notificationID, placeholder],
//                         (err, result) => {
//                             if (err) return reject(err);
//                             return resolve({ status: '200', message: 'Notification added successfully' });
//                         });
//                 } else {
//                     // Get all ministry members
//                     pool.query('SELECT MemberID FROM memberministries WHERE MinistryID = ? AND request = "Approved"', [ministryID], (err, results) => {
//                         if (err) return reject(err);
//                         console.log(results);
//                         console.log(notificationID);

//                         // Prepare an array of queries for inserting recipients
//                         const recipientQueries = results.map(member => {
//                             return new Promise((resolve, reject) => {
//                                 pool.query('INSERT INTO notification_recipients (NotificationID, MemberID) VALUES (?, ?)',
//                                     [notificationID, member.MemberID],
//                                     (err, result) => {
//                                         if (err) return reject(err);
//                                         resolve(result);
//                                     });
//                             });
//                         });

//                         // Execute all recipient insertions
//                         Promise.all(recipientQueries)
//                             .then(() => resolve({ status: '200', message: 'Notification added successfully' }))
//                             .catch(err => reject(err));
//                     });
//                 }
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
                            // Send push notification to all members
                            sendPushNotificationToAllMembers(header, content)
                                .then(() => resolve({ status: '200', message: 'Notification added and sent successfully' }))
                                .catch(err => reject(err));
                        });
                } else {
                    // Get all ministry members
                    pool.query('SELECT MemberID FROM memberministries WHERE MinistryID = ? AND request = "Approved"', [ministryID], (err, results) => {
                        if (err) return reject(err);

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
                            .then(() => {
                                // Send push notification to ministry members
                                sendPushNotificationToMembers(results, header, content)
                                    .then(() => resolve({ status: '200', message: 'Notification added and sent successfully' }))
                                    .catch(err => reject(err));
                            })
                            .catch(err => reject(err));
                    });
                }
            });
    });
};

const sendPushNotificationToAllMembers = async (header, content) => {
    try {
        // Fetch all members' Expo push tokens
        const [members] = await pool.query('SELECT pushtoken FROM members WHERE pushtoken IS NOT NULL');
        const expoPushTokens = members.map(member => member.pushtoken);

        // Send push notifications to all members
        await sendPushNotifications(expoPushTokens, header, content);
    } catch (error) {
        console.error('Error sending push notifications to all members:', error);
        throw error;
    }
};

const sendPushNotificationToMembers = async (members, header, content) => {
    try {
        // Fetch Expo push tokens for the given members
        const memberIDs = members.map(member => member.MemberID);
        const [tokens] = await pool.query('SELECT pushtoken FROM members WHERE MemberID IN (?) AND pushtoken IS NOT NULL', [memberIDs]);
        const expoPushTokens = tokens.map(token => token.pushtoken);

        // Send push notifications to the selected members
        await sendPushNotifications(expoPushTokens, header, content);
    } catch (error) {
        console.error('Error sending push notifications to members:', error);
        throw error;
    }
};

const sendPushNotifications = async (expoPushTokens, header, content) => {
    try {
        const messages = expoPushTokens.map(token => ({
            to: token,
            sound: 'default',
            title: header,
            body: content,
            data: { someData: 'goes here' },
        }));

        const response = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messages),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Failed to send push notifications:', data);
            throw new Error('Failed to send push notifications');
        }

        return data;
    } catch (error) {
        console.error('Error sending push notifications:', error);
        throw error;
    }
};

notificationsObj.getNotifications = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM notifications ORDER BY id DESC`, (err, results) => {
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

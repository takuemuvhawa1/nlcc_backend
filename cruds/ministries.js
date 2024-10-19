require('dotenv').config();
const pool = require('./poolfile');

let ministriesObj = {};

ministriesObj.postMinistry = (Name, Description, CalendarID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO ministries(Name, Description, CalendarID) VALUES (?, ?, ?)', 
        [Name, Description, CalendarID], 
        (err, result) => {
            if (err) return reject(err);

            const ministryID = result.insertId;
            return resolve({ status: '200', message: 'Ministry added successfully', MinistryID: ministryID });
        });
    });
};
    

ministriesObj.getMinistries = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministries', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// ministriesObj.getMinistriesJoin = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('SELECT m.MinistryID, m.Name AS MinistryName, m.Description, ml.LeaderID, mem.Name AS LeaderName, mem.Surname AS LeaderSurname, mem.Phone AS Phoneno, ml.StartDate, ml.EndDate FROM ministries m LEFT JOIN ministryleaders ml ON m.MinistryID = ml.MinistryID LEFT JOIN members mem ON ml.LeaderID = mem.MemberID ', (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

ministriesObj.getMinistriesJoin = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT m.MinistryID, m.Name AS MinistryName, m.Description, ml.LeaderID, mem.Name AS LeaderName, mem.Surname AS LeaderSurname, mem.Phone AS Phoneno FROM ministries m LEFT JOIN ministryleaders ml ON m.MinistryID = ml.MinistryID LEFT JOIN members mem ON ml.LeaderID = mem.MemberID ', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// ministriesObj.getMinistriesJoin2 = (memberId) => {
//     return new Promise((resolve, reject) => {
//         const query = `
//             SELECT 
//                 m.MinistryID, 
//                 m.Name AS MinistryName, 
//                 m.Description, 
//                 ml.LeaderID, 
//                 mem.Name AS LeaderName, 
//                 mem.Surname AS LeaderSurname, 
//                 mem.Phone AS Phoneno,
//                 mm.MemberID
//             FROM 
//                 ministries m 
//             LEFT JOIN 
//                 ministryleaders ml ON m.MinistryID = ml.MinistryID 
//             LEFT JOIN 
//                 members mem ON ml.LeaderID = mem.MemberID 
//             LEFT JOIN 
//                 memberministries mm ON m.MinistryID = mm.MinistryID AND mm.MemberID = ?`;

//         pool.query(query, [memberId], (err, results) => {
//             if (err) return reject(err);
//             return resolve(results);
//         });
//     });
// };

ministriesObj.getMinistriesJoin2 = (memberId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                m.MinistryID, 
                m.Name AS MinistryName, 
                m.Description, 
                ml.LeaderID, 
                ml.preferred, 
                mem.Name AS LeaderName, 
                mem.Surname AS LeaderSurname, 
                mem.Phone AS Phoneno,
                mem.Email AS LeaderEmail,
                mm.MemberID,
                mm.request
            FROM 
                ministries m 
            LEFT JOIN 
                ministryleaders ml ON m.MinistryID = ml.MinistryID 
            LEFT JOIN 
                members mem ON ml.LeaderID = mem.MemberID 
            LEFT JOIN 
                memberministries mm ON m.MinistryID = mm.MinistryID AND mm.MemberID = ?`;

        pool.query(query, [memberId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministriesObj.getLeadersForMinistry = (ministryId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                ml.LeaderID, 
                m.Name AS adminName, 
                m.Surname AS adminSurname, 
                m.Phone AS adminphone, 
                m.Email AS adminemail,
                m.preferred_email AS email_comm, 
                m.preferred_phone AS phone_comm
            FROM 
                ministryleaders ml 
            JOIN 
                members m ON ml.LeaderID = m.MemberID 
            WHERE 
                ml.MinistryID = ?`;

        pool.query(query, [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results.map(leader => ({
                leaderID: leader.LeaderID,
                admin: `${leader.adminName} ${leader.adminSurname}`,
                adminphone: leader.adminphone,
                adminemail: leader.adminemail,
                email_comm: !!leader.email_comm, // Convert to boolean
                phone_comm: !!leader.phone_comm, // Convert to boolean
            })));
        });
    });
};

ministriesObj.getMembersByMinistryId = (ministryId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                mem.MemberID, 
                mem.Name, 
                mem.Surname, 
                mem.Phone 
            FROM 
                members mem 
            JOIN 
                memberministries mm ON mem.MemberID = mm.MemberID 
            WHERE 
                (mm.MinistryID = ? AND mm.request = "Approved")`;

        pool.query(query, [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

//Join Requests
ministriesObj.getMembersByMinistryJoinReq = (ministryId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                mem.MemberID, 
                mem.Name, 
                mem.Surname, 
                mem.Phone 
            FROM 
                members mem 
            JOIN 
                memberministries mm ON mem.MemberID = mm.MemberID 
            WHERE 
                (mm.MinistryID = ? AND mm.request IS NULL)`;

        pool.query(query, [ministryId, null], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

//Leave Requests
ministriesObj.getMembersByMinistryLeaveReq = (ministryId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                mem.MemberID, 
                mem.Name, 
                mem.Surname, 
                mem.Phone 
            FROM 
                members mem 
            JOIN 
                memberministries mm ON mem.MemberID = mm.MemberID 
            WHERE 
                (mm.MinistryID = ? AND mm.request = "Leave")`;

        pool.query(query, [ministryId, null], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


ministriesObj.getMinistryById = (ministryId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM ministries WHERE MinistryID = ?', [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

ministriesObj.updateMinistry = (MinistryID, Name, Description, CalendarID, LeaderID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE ministries SET Name = ?, Description = ?, CalendarID = ? WHERE MinistryID = ?',
            [Name, Description, CalendarID, MinistryID], 
            (err, result) => {
                if (err) return reject(err);

                pool.query('UPDATE ministryleaders SET LeaderID = ? WHERE MinistryID = ?',
                    [LeaderID, MinistryID] )

                return resolve({ status: '200', message: 'Ministry updated successfully' });
            });
    });
};

ministriesObj.deleteMinistry = (ministryId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM ministries WHERE MinistryID = ?', [ministryId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Ministry deleted successfully' });
        });
    });
};

module.exports = ministriesObj;

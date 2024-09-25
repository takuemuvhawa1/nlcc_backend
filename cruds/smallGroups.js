require('dotenv').config();
const pool = require('./poolfile');

let smallGroupsObj = {};

smallGroupsObj.postSmallGroup = (Name, Description, CalendarID, Location) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO smallgroups(Name, Description, CalendarID, Location) VALUES (?, ?, ?, ?)', 
        [Name, Description, CalendarID, Location], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group added successfully' });
        });
    });
};

smallGroupsObj.getSmallGroups = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroups', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupsObj.getSmallGroupsJoin2 = () => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                sg.SmallGroupID, 
                sg.Name AS SmallGroupName, 
                sg.Description, 
                sg.Location, 
                sgl.LeaderID, 
                mem.Name AS LeaderName, 
                mem.Surname AS LeaderSurname, 
                mem.Phone AS Phoneno
            FROM 
                smallgroups sg 
            LEFT JOIN 
                smallgroupleaders sgl ON sg.SmallGroupID = sgl.SmallGroupID 
            LEFT JOIN 
                members mem ON sgl.LeaderID = mem.MemberID`;

        pool.query(query, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};



smallGroupsObj.getSmallGroupsJoin = (memberId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                sg.SmallGroupID, 
                sg.Name, 
                sg.Description, 
                sg.Location,
                sgl.LeaderID,
                mem.Name AS LeaderName,
                mem.Surname AS LeaderSurname,
                mem.Phone AS Phoneno,
                msg.MemberID
            FROM 
                smallgroups sg 
            LEFT JOIN 
                smallgroupleaders sgl ON sg.SmallGroupID = sgl.SmallGroupID 
            LEFT JOIN 
                members mem ON sgl.LeaderID = mem.MemberID 
            LEFT JOIN 
                membersmallgroups msg ON sg.SmallGroupID = msg.SmallGroupID AND msg.MemberID = ?`;

        pool.query(query, [memberId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


//NEW CRUDS FOR LEADERS
smallGroupsObj.getMembersBySmallGroupId = (smallGroupId) => {
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
                membersmallgroups msg ON mem.MemberID = msg.MemberID 
            WHERE 
                (msg.SmallGroupID = ? AND msg.request = "Approved")`;

        pool.query(query, [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Join Requests
smallGroupsObj.getMembersBySmallGroupJoinReq = (smallGroupId) => {
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
                membersmallgroups msg ON mem.MemberID = msg.MemberID 
            WHERE 
                (msg.SmallGroupID = ? AND msg.request IS NULL)`;

        pool.query(query, [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

// Leave Requests
smallGroupsObj.getMembersBySmallGroupLeaveReq = (smallGroupId) => {
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
                membersmallgroups msg ON mem.MemberID = msg.MemberID 
            WHERE 
                (msg.SmallGroupID = ? AND msg.request = "Leave")`;

        pool.query(query, [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};


smallGroupsObj.getSmallGroupById = (smallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM smallgroups WHERE SmallGroupID = ?', [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

smallGroupsObj.updateSmallGroup = (SmallGroupID, Name, Description, CalendarID, Location) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE smallgroups SET Name = ?, Description = ?, CalendarID = ?, Location = ? WHERE SmallGroupID = ?',
            [Name, Description, CalendarID, Location, SmallGroupID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Small group updated successfully' });
            });
    });
};

smallGroupsObj.deleteSmallGroup = (smallGroupId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM smallgroups WHERE SmallGroupID = ?', [smallGroupId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Small group deleted successfully' });
        });
    });
};

module.exports = smallGroupsObj;

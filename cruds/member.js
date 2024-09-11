require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postMember = (Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO members(Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone], 
        (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ status: '200', message: 'Member added successfully' });
        });
    });
};

crudsObj.getMembers = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM members', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

crudsObj.getMemberById = (memberId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM members WHERE MemberID = ?', [memberId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

crudsObj.updateMember = (MemberID, Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE members SET Name = ?, Surname = ?, Email = ?, Phone = ?, Address = ?, City = ?, Country = ?, MembershipStatus = ?, ProfilePicture = ?, Gender = ?, Suburb = ?, Zone = ? WHERE MemberID = ?',
            [Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, MemberID], 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'Member updated successfully' });
            });
    });
};

crudsObj.deleteMember = (memberId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM members WHERE MemberID = ?', [memberId], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve({ status: '200', message: 'Member deleted successfully' });
        });
    });
};

module.exports = crudsObj;
require('dotenv').config();
const pool = require('./poolfile');

let crudsObj = {};

crudsObj.postMember = (Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO members(Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone], 
        (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve({ status: '200', message: 'Member added successfully' });
        });
    });
};

// crudsObj.postMemberDetails = (
//     Address, 
//     City, 
//     nxt_of_kin,
//     nok_relationship,
//     nok_phone,
//     emergency_contact,
//     emerg_con_relationship,
//     emerg_phone
// ) => {
//     return new Promise((resolve, reject) => {
//         pool.query(
//             'INSERT INTO members(Address, City, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
//             [
//                 Address, 
//                 City, 
//                 nxt_of_kin,
//                 nok_relationship,
//                 nok_phone,
//                 emergency_contact,
//                 emerg_con_relationship,
//                 emerg_phone
//             ], 
//             (err, result) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 return resolve({ status: '200', message: 'Member added successfully' });
//             }
//         );
//     });
// };

// crudsObj.postMember = (Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone) => {
//     return new Promise((resolve, reject) => {
//         pool.query('INSERT INTO members(Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
//         [Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone], 
//         (err, result) => {
//             if (err) {
//                 return reject(err);
//             }
//             return resolve({ status: '200', message: 'Member added successfully' });
//         });
//     });
// };

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

crudsObj.getMembersByPreferred = (memberID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT preferred_email, preferred_phone FROM members WHERE memberID = ?', [memberID], (err, results) => {
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


crudsObj.updateMember = (MemberID, Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE members SET Name = ?, Surname = ?, Email = ?, Phone = ?, Address = ?, City = ?, Country = ?, MembershipStatus = ?, ProfilePicture = ?, Gender = ?, Suburb = ?, Zone = ?, nxt_of_kin = ?, nok_relationship = ?, nok_phone = ?, emergency_contact = ?, emerg_con_relationship = ?, emerg_phone = ? WHERE MemberID = ?',
            [Name, Surname, Email, Phone, Address, City, Country, MembershipStatus, ProfilePicture, Gender, Suburb, Zone, nxt_of_kin, nok_relationship, nok_phone, emergency_contact, emerg_con_relationship, emerg_phone, MemberID], 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'Member updated successfully' });
            });
    });
};

crudsObj.updateMemberProfilePic = (MemberID, ProfilePicture) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE members SET ProfilePicture = ? WHERE MemberID = ?',
            [ProfilePicture, MemberID], 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'Member updated successfully' });
            });
    });
};

crudsObj.updateMemberDetails = (
    memberID, 
    Address, 
    City, 
    nxt_of_kin,
    nok_relationship,
    nok_phone,
    emergency_contact,
    emerg_con_relationship,
    emerg_phone
) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE members SET Address = ?, City = ?, nxt_of_kin = ?, nok_relationship = ?, nok_phone = ?, emergency_contact = ?, emerg_con_relationship = ?, emerg_phone = ? WHERE MemberID = ?', 
            [
                Address, 
                City, 
                nxt_of_kin,
                nok_relationship,
                nok_phone,
                emergency_contact,
                emerg_con_relationship,
                emerg_phone,
                memberID
            ], 
            (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'Member details updated successfully' });
            }
        );
    });
};
crudsObj.updateMemberPreferred = (memberID, email, phone) => {
    return new Promise((resolve, reject) => {
        let preferred_email = true;
        let preferred_phone = true;
        if(email === false){
            preferred_email = false;
        }
        if(phone === false){
            preferred_phone = false;
        }
        pool.query(
            'UPDATE members SET preferred_email = ?, preferred_phone = ? WHERE MemberID = ?', 
            [ preferred_email, preferred_phone, memberID ], (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve({ status: '200', message: 'Member details updated successfully' });
            }
        );
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
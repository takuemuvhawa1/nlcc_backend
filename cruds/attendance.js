require('dotenv').config();
const pool = require('./poolfile');

let attendanceObj = {};

attendanceObj.postAttendance = (MemberID, Date, EventID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO attendance(MemberID, Date, EventID) VALUES (?, ?, ?)', 
        [MemberID, Date, EventID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record added successfully' });
        });
    });
};

attendanceObj.getAttendance = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM attendance', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

attendanceObj.getAttendanceById = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM attendance WHERE AttendanceID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

attendanceObj.updateAttendance = (AttendanceID, MemberID, Date, EventID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE attendance SET MemberID = ?, Date = ?, EventID = ? WHERE AttendanceID = ?',
            [MemberID, Date, EventID, AttendanceID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Attendance record updated successfully' });
            });
    });
};

attendanceObj.deleteAttendance = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM attendance WHERE AttendanceID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record deleted successfully' });
        });
    });
};

module.exports = attendanceObj;

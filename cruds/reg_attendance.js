require('dotenv').config();
const pool = require('./poolfile');

let regAttendanceObj = {};

regAttendanceObj.postAttendance = (TotalAttendance, RegDate, EventID) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO attendance_reg (TotalAttendance, RegDate, EventID) VALUES (?, ?, ?)', 
        [TotalAttendance, RegDate, EventID], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record added successfully' });
        });
    });
};

regAttendanceObj.getAttendance = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM attendance_reg', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

regAttendanceObj.getAttendanceById = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM attendance_reg WHERE AttendanceID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

regAttendanceObj.updateAttendance = (AttendanceID, TotalAttendance, RegDate, EventID) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE attendance_reg SET TotalAttendance = ?, RegDate = ?, EventID = ? WHERE AttendanceID = ?',
            [TotalAttendance, RegDate, EventID, AttendanceID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Attendance record updated successfully' });
            });
    });
};

regAttendanceObj.deleteAttendance = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM attendance_reg WHERE AttendanceID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record deleted successfully' });
        });
    });
};

module.exports = regAttendanceObj;

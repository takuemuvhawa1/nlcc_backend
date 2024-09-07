require('dotenv').config();
const pool = require('./poolfile');

let volunteerSignupAttendanceObj = {};

volunteerSignupAttendanceObj.postAttendance = (VolunteerSignupID, AttendanceStatus) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO volunteer_signup_attendance(VolunteerSignupID, AttendanceStatus) VALUES (?, ?)', 
        [VolunteerSignupID, AttendanceStatus], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record added successfully' });
        });
    });
};

volunteerSignupAttendanceObj.getAttendances = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteer_signup_attendance', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerSignupAttendanceObj.getAttendanceById = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM volunteer_signup_attendance WHERE ID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

volunteerSignupAttendanceObj.updateAttendance = (ID, VolunteerSignupID, AttendanceStatus) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE volunteer_signup_attendance SET VolunteerSignupID = ?, AttendanceStatus = ? WHERE ID = ?',
            [VolunteerSignupID, AttendanceStatus, ID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Attendance record updated successfully' });
            });
    });
};

volunteerSignupAttendanceObj.deleteAttendance = (attendanceId) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM volunteer_signup_attendance WHERE ID = ?', [attendanceId], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Attendance record deleted successfully' });
        });
    });
};

module.exports = volunteerSignupAttendanceObj;

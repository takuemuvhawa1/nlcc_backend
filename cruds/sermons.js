require('dotenv').config();
const pool = require('./poolfile');

const sermonsObj = {};

sermonsObj.postSermon = (name, weblink, date) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO sermons(name, weblink, date) VALUES (?, ?, ?)', 
        [name, weblink, date], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Sermon added successfully' });
        });
    });
};

sermonsObj.getSermons = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM sermons', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

sermonsObj.getSermonById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM sermons WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

sermonsObj.updateSermon = (id, name, weblink, date) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE sermons SET name = ?, weblink = ?, date = ? WHERE id = ?',
            [name, weblink, date, id], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Sermon updated successfully' });
            });
    });
};

sermonsObj.deleteSermon = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM sermons WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Sermon deleted successfully' });
        });
    });
};

module.exports = sermonsObj;

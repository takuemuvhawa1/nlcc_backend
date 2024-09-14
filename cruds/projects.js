require('dotenv').config();
const pool = require('./poolfile');

const projectsObj = {};

projectsObj.postProject = (ProjectName, Description, StartDate, EndDate, Status) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO projects(ProjectName, Description, StartDate, EndDate, Status) VALUES (?, ?, ?, ?, ?)', 
        [ProjectName, Description, StartDate, EndDate, Status], 
        (err, result) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Project added successfully' });
        });
    });
};

projectsObj.getProjects = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM projects', (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

projectsObj.getProjectById = (projectID) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM projects WHERE ProjectID = ?', [projectID], (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        });
    });
};

projectsObj.updateProject = (ProjectID, ProjectName, Description, StartDate, EndDate, Status) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE projects SET ProjectName = ?, Description = ?, StartDate = ?, EndDate = ?, Status = ? WHERE ProjectID = ?',
            [ProjectName, Description, StartDate, EndDate, Status, ProjectID], 
            (err, result) => {
                if (err) return reject(err);
                return resolve({ status: '200', message: 'Project updated successfully' });
            });
    });
};

projectsObj.deleteProject = (projectID) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM projects WHERE ProjectID = ?', [projectID], (err, results) => {
            if (err) return reject(err);
            return resolve({ status: '200', message: 'Project deleted successfully' });
        });
    });
};

module.exports = projectsObj;
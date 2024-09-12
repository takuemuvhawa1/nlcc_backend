const express = require('express');
const regAttendanceRouter = express.Router();
const attendanceDbOperations = require('../cruds/reg_attendance');

regAttendanceRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await attendanceDbOperations.postAttendance(postedValues.TotalAttendance, postedValues.RegDate, postedValues.EventID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

regAttendanceRouter.get('/', async (req, res) => {
    try {
        const results = await attendanceDbOperations.getAttendance();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

regAttendanceRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await attendanceDbOperations.getAttendanceById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

regAttendanceRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await attendanceDbOperations.updateAttendance(id, updatedValues.TotalAttendance, updatedValues.RegDate, updatedValues.EventID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

regAttendanceRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await attendanceDbOperations.deleteAttendance(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = regAttendanceRouter;

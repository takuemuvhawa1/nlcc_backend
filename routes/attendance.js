const express = require('express');
const attendanceRouter = express.Router();
const attendanceDbOperations = require('../cruds/attendance');

attendanceRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await attendanceDbOperations.postAttendance(postedValues.MemberID, postedValues.Date, postedValues.EventID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

attendanceRouter.get('/', async (req, res) => {
    try {
        const results = await attendanceDbOperations.getAttendance();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

attendanceRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await attendanceDbOperations.getAttendanceById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

attendanceRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await attendanceDbOperations.updateAttendance(id, updatedValues.MemberID, updatedValues.Date, updatedValues.EventID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

attendanceRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await attendanceDbOperations.deleteAttendance(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = attendanceRouter;

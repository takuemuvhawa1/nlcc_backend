// routes/volunteerSignupAttendanceRoutes.js
const express = require('express');
const volunteerSignupAttendanceRouter = express.Router();
const volunteerSignupAttendanceDbOperations = require('../cruds/volunteerSignupAttendance');

volunteerSignupAttendanceRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await volunteerSignupAttendanceDbOperations.postAttendance(postedValues.VolunteerSignupID, postedValues.AttendanceStatus);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupAttendanceRouter.get('/', async (req, res) => {
    try {
        const results = await volunteerSignupAttendanceDbOperations.getAttendances();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupAttendanceRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerSignupAttendanceDbOperations.getAttendanceById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupAttendanceRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await volunteerSignupAttendanceDbOperations.updateAttendance(id, updatedValues.VolunteerSignupID, updatedValues.AttendanceStatus);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupAttendanceRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerSignupAttendanceDbOperations.deleteAttendance(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = volunteerSignupAttendanceRouter;

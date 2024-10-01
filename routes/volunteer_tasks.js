// routes/volunteerTasksRoutes.js
const express = require('express');
const volunteerTasksRouter = express.Router();
const volunteerTasksDbOperations = require('../cruds/volunteer_tasks');

volunteerTasksRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await volunteerTasksDbOperations.postTasks(postedValues.event_id, postedValues.task, postedValues.requirements);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerTasksRouter.get('/', async (req, res) => {
    try {
        const results = await volunteerTasksDbOperations.getTasks();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerTasksRouter.get('/join/events/', async (req, res) => {
    try {
        const results = await volunteerTasksDbOperations.getTasksJoin();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerTasksRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerTasksDbOperations.getTasksById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerTasksRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await volunteerTasksDbOperations.updateTasks(id, updatedValues.event_id, updatedValues.task, updatedValues.requirements);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerTasksRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerTasksDbOperations.deleteTasks(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = volunteerTasksRouter;

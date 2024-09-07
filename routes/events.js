const express = require('express');
const eventRouter = express.Router();
const eventsDbOperations = require('../cruds/events');

eventRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await eventsDbOperations.postEvent(postedValues.Name, postedValues.Date, postedValues.Time, postedValues.Location, postedValues.Description, postedValues.TargetGroupID, postedValues.TargetType, postedValues.Recurring, postedValues.RecurrencePattern, postedValues.RecurrenceEndDate);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRouter.get('/', async (req, res) => {
    try {
        const results = await eventsDbOperations.getEvents();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eventsDbOperations.getEventById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await eventsDbOperations.updateEvent(id, updatedValues.Name, updatedValues.Date, updatedValues.Time, updatedValues.Location, updatedValues.Description, updatedValues.TargetGroupID, updatedValues.TargetType, updatedValues.Recurring, updatedValues.RecurrencePattern, updatedValues.RecurrenceEndDate);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eventsDbOperations.deleteEvent(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = eventRouter;

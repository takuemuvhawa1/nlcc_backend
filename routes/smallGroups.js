const express = require('express');
const smallGroupsRouter = express.Router();
const smallGroupsDbOperations = require('../cruds/smallGroups');

smallGroupsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await smallGroupsDbOperations.postSmallGroup(postedValues.Name, postedValues.Description, postedValues.CalendarID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupsRouter.get('/', async (req, res) => {
    try {
        const results = await smallGroupsDbOperations.getSmallGroups();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await smallGroupsDbOperations.getSmallGroupById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await smallGroupsDbOperations.updateSmallGroup(id, updatedValues.Name, updatedValues.Description, updatedValues.CalendarID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await smallGroupsDbOperations.deleteSmallGroup(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = smallGroupsRouter;

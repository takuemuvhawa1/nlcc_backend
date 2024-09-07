const express = require('express');
const smallGroupLeadersRouter = express.Router();
const smallGroupLeadersDbOperations = require('../cruds/smallGroupLeaders');

smallGroupLeadersRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await smallGroupLeadersDbOperations.postSmallGroupLeader(postedValues.SmallGroupID, postedValues.LeaderID, postedValues.StartDate, postedValues.EndDate);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupLeadersRouter.get('/', async (req, res) => {
    try {
        const results = await smallGroupLeadersDbOperations.getSmallGroupLeaders();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupLeadersRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await smallGroupLeadersDbOperations.getSmallGroupLeaderById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupLeadersRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await smallGroupLeadersDbOperations.updateSmallGroupLeader(id, updatedValues.SmallGroupID, updatedValues.LeaderID, updatedValues.StartDate, updatedValues.EndDate);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

smallGroupLeadersRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await smallGroupLeadersDbOperations.deleteSmallGroupLeader(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = smallGroupLeadersRouter;

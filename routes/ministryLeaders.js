const express = require('express');
const ministryLeaderRouter = express.Router();
const ministryLeadersDbOperations = require('../cruds/ministryLeaders');

ministryLeaderRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await ministryLeadersDbOperations.postLeader(postedValues.MinistryID, postedValues.LeaderID, postedValues.StartDate, postedValues.EndDate, postedValues.Preferred);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryLeaderRouter.get('/', async (req, res) => {
    try {
        const results = await ministryLeadersDbOperations.getLeaders();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryLeaderRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministryLeadersDbOperations.getLeaderById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryLeaderRouter.get('/ministry/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministryLeadersDbOperations.getByMinistryId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryLeaderRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await ministryLeadersDbOperations.updateLeader(id, updatedValues.MinistryID, updatedValues.LeaderID, updatedValues.StartDate, updatedValues.EndDate, updatedValues.Preferred);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryLeaderRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministryLeadersDbOperations.deleteLeader(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = ministryLeaderRouter;

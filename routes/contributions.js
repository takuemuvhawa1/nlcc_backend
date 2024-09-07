const express = require('express');
const contributionRouter = express.Router();
const contributionsDbOperations = require('../cruds/contributions');

contributionRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await contributionsDbOperations.postContribution(postedValues.MemberID, postedValues.Date, postedValues.Amount, postedValues.Method, postedValues.PledgeID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contributionRouter.get('/', async (req, res) => {
    try {
        const results = await contributionsDbOperations.getContributions();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contributionRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await contributionsDbOperations.getContributionById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contributionRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await contributionsDbOperations.updateContribution(id, updatedValues.MemberID, updatedValues.Date, updatedValues.Amount, updatedValues.Method, updatedValues.PledgeID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

contributionRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await contributionsDbOperations.deleteContribution(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = contributionRouter;

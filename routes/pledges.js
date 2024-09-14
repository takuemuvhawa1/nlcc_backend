// routes/pledgeRoutes.js
const express = require('express');
const pledgeRouter = express.Router();
const pledgesDbOperations = require('../cruds/pledges');

pledgeRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await pledgesDbOperations.postPledge(postedValues.MemberID, postedValues.StartDate, postedValues.EndDate, postedValues.Amount, postedValues.Frequency, postedValues.ProjectID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

pledgeRouter.get('/', async (req, res) => {
    try {
        const results = await pledgesDbOperations.getPledges();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

pledgeRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pledgesDbOperations.getPledgeById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

pledgeRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await pledgesDbOperations.updatePledge(id, updatedValues.MemberID, updatedValues.StartDate, updatedValues.EndDate, updatedValues.Amount, updatedValues.Frequency, updatedValues.ProjectID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

pledgeRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pledgesDbOperations.deletePledge(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = pledgeRouter;

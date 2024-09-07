// routes/volunteerOpportunityRoutes.js
const express = require('express');
const volunteerOpportunityRouter = express.Router();
const volunteerOpportunitiesDbOperations = require('../cruds/volunteerOpportunities');

volunteerOpportunityRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await volunteerOpportunitiesDbOperations.postOpportunity(postedValues.Name, postedValues.Date, postedValues.Time, postedValues.Location, postedValues.Description);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerOpportunityRouter.get('/', async (req, res) => {
    try {
        const results = await volunteerOpportunitiesDbOperations.getOpportunities();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerOpportunityRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerOpportunitiesDbOperations.getOpportunityById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerOpportunityRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await volunteerOpportunitiesDbOperations.updateOpportunity(id, updatedValues.Name, updatedValues.Date, updatedValues.Time, updatedValues.Location, updatedValues.Description);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerOpportunityRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerOpportunitiesDbOperations.deleteOpportunity(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = volunteerOpportunityRouter;

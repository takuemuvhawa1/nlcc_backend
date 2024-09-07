const express = require('express');
const volunteerSignupRouter = express.Router();
const volunteerSignupsDbOperations = require('../cruds/volunteerSignups');

volunteerSignupRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await volunteerSignupsDbOperations.postSignup(postedValues.OpportunityID, postedValues.MemberID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupRouter.get('/', async (req, res) => {
    try {
        const results = await volunteerSignupsDbOperations.getSignups();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerSignupsDbOperations.getSignupById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

volunteerSignupRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await volunteerSignupsDbOperations.deleteSignup(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = volunteerSignupRouter;

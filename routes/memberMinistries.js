const express = require('express');
const memberMinistryRouter = express.Router();
const memberMinistriesDbOperations = require('../cruds/memberMinistries');

memberMinistryRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await memberMinistriesDbOperations.postMemberMinistry(postedValues.MemberID, postedValues.MinistryID, postedValues.StartDate, postedValues.EndDate);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberMinistryRouter.get('/', async (req, res) => {
    try {
        const results = await memberMinistriesDbOperations.getMemberMinistries();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberMinistryRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await memberMinistriesDbOperations.getMemberMinistryById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberMinistryRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await memberMinistriesDbOperations.updateMemberMinistry(id, updatedValues.MemberID, updatedValues.MinistryID, updatedValues.StartDate, updatedValues.EndDate);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberMinistryRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await memberMinistriesDbOperations.deleteMemberMinistry(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = memberMinistryRouter;


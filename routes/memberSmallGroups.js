const express = require('express');
const memberSmallGroupsRouter = express.Router();
const memberSmallGroupsDbOperations = require('../cruds/memberSmallGroups');

memberSmallGroupsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await memberSmallGroupsDbOperations.postMemberSmallGroup(postedValues.MemberID, postedValues.SmallGroupID, postedValues.StartDate, postedValues.EndDate, postedValues.Request);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberSmallGroupsRouter.get('/', async (req, res) => {
    try {
        const results = await memberSmallGroupsDbOperations.getMemberSmallGroups();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberSmallGroupsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await memberSmallGroupsDbOperations.getMemberSmallGroupById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberSmallGroupsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await memberSmallGroupsDbOperations.updateMemberSmallGroup(id, updatedValues.MemberID, updatedValues.SmallGroupID, updatedValues.StartDate, updatedValues.EndDate, updatedValues.Request);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberSmallGroupsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await memberSmallGroupsDbOperations.deleteMemberSmallGroup(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = memberSmallGroupsRouter;

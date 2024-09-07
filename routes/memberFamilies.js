const express = require('express');
const memberFamilyRouter = express.Router();
const memberFamiliesDbOperations = require('../cruds/memberFamilies');

memberFamilyRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await memberFamiliesDbOperations.postMemberFamily(postedValues.MemberID, postedValues.FamilyID, postedValues.Relationship);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberFamilyRouter.get('/', async (req, res) => {
    try {
        const results = await memberFamiliesDbOperations.getMemberFamilies();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberFamilyRouter.get('/:memberId/:familyId', async (req, res) => {
    try {
        const { memberId, familyId } = req.params;
        const result = await memberFamiliesDbOperations.getMemberFamilyById(memberId, familyId);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberFamilyRouter.put('/:memberId/:familyId', async (req, res) => {
    try {
        const { memberId, familyId } = req.params;
        const updatedValues = req.body;
        const result = await memberFamiliesDbOperations.updateMemberFamily(memberId, familyId, updatedValues.Relationship);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberFamilyRouter.delete('/:memberId/:familyId', async (req, res) => {
    try {
        const { memberId, familyId } = req.params;
        const result = await memberFamiliesDbOperations.deleteMemberFamily(memberId, familyId);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = memberFamilyRouter;

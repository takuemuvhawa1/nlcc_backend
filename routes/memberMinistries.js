const express = require('express');
const memberMinistryRouter = express.Router();
const memberMinistriesDbOperations = require('../cruds/memberMinistries');

memberMinistryRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await memberMinistriesDbOperations.postMemberMinistry(postedValues.MemberID, postedValues.MinistryID, postedValues.StartDate, postedValues.EndDate, postedValues.Request);
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

memberMinistryRouter.get('/join/:id', async (req, res) => {
    try {
        const id = req.params.id
        const results = await memberMinistriesDbOperations.getMemberMinistriesJoin(id);
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

// Request to Leave Ministry
memberMinistryRouter.put('/reqleave/:memberID/:ministryID', async (req, res) => {
    try {
        const id = req.params.memberID; 
        const ministryID = req.params.ministryID; 
        const result = await memberMinistriesDbOperations.updateMemberMinistryReqLeave(id, ministryID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Approve Member Ministry
memberMinistryRouter.put('/approve/:memberID/:ministryID', async (req, res) => {
    try {
        const id = req.params.memberID; 
        const ministryID = req.params.ministryID; 
        const result = await memberMinistriesDbOperations.updateApproveMemberMinistry(id, ministryID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Exit Member Ministry
memberMinistryRouter.put('/leave/:memberID/:ministryID', async (req, res) => {
    try {
        const id = req.params.memberID; 
        const ministryID = req.params.ministryID; 
        const result = await memberMinistriesDbOperations.updateApproveLeaveMemberMinistry(id, ministryID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Request to Join Ministry
memberMinistryRouter.post('/join', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await memberMinistriesDbOperations.postMemberMinistryReqJoin(postedValues.MemberID, postedValues.MinistryID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


memberMinistryRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await memberMinistriesDbOperations.updateMemberMinistry(id, updatedValues.MemberID, updatedValues.MinistryID, updatedValues.StartDate, updatedValues.EndDate, updatedValues.Request);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberMinistryRouter.delete('/:memberId/:ministryId', async (req, res) => {
    try {
        const memberId = req.params.memberId;
        const ministryId = req.params.ministryId;
        const result = await memberMinistriesDbOperations.deleteMemberMinistryJoin(memberId, ministryId);
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


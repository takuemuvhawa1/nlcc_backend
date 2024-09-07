const express = require('express');
const memberRouter = express.Router();
const membersDbOperations = require('../cruds/member');

memberRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await membersDbOperations.postMember(postedValues.Name, postedValues.Surname, postedValues.Email, postedValues.Phone, postedValues.Address, postedValues.City, postedValues.Country, postedValues.MembershipStatus, postedValues.ProfilePicture);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.get('/', async (req, res) => {
    try {
        const results = await membersDbOperations.getMembers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await membersDbOperations.getMemberById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await membersDbOperations.updateMember(id, updatedValues.Name, updatedValues.Surname, updatedValues.Email, updatedValues.Phone, updatedValues.Address, updatedValues.City, updatedValues.Country, updatedValues.MembershipStatus, updatedValues.ProfilePicture);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await membersDbOperations.deleteMember(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = memberRouter;

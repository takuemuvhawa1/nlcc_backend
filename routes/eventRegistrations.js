const express = require('express');
const eventRegistrationRouter = express.Router();
const eventRegistrationsDbOperations = require('../cruds/eventRegistrations');

eventRegistrationRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await eventRegistrationsDbOperations.postRegistration(postedValues.EventID, postedValues.MemberID, postedValues.RSVPStatus);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRegistrationRouter.get('/', async (req, res) => {
    try {
        const results = await eventRegistrationsDbOperations.getRegistrations();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRegistrationRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eventRegistrationsDbOperations.getRegistrationById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRegistrationRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await eventRegistrationsDbOperations.updateRegistration(id, updatedValues.EventID, updatedValues.MemberID, updatedValues.RSVPStatus);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventRegistrationRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await eventRegistrationsDbOperations.deleteRegistration(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = eventRegistrationRouter;

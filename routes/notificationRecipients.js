const express = require('express');
const notificationRecipientsRouter = express.Router();
const notificationDbOperations = require('../cruds/notificationRecipients');

// POST: Add a new recipient
notificationRecipientsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await notificationDbOperations.addRecipient(postedValues.NotificationID, postedValues.MemberID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET: Get all recipients
notificationRecipientsRouter.get('/', async (req, res) => {
    try {
        const results = await notificationDbOperations.getRecipients();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET: Get a recipient by ID
notificationRecipientsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationDbOperations.getRecipientById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
// GET: Get a recipient by ID
notificationRecipientsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationDbOperations.getRecipientById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// GET: Get a recipient by ID
notificationRecipientsRouter.get('/member/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationDbOperations.getRecipientByMemberId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// PUT: Update a recipient
notificationRecipientsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await notificationDbOperations.updateRecipient(id, updatedValues.NotificationID, updatedValues.MemberID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// DELETE: Remove a recipient
notificationRecipientsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationDbOperations.deleteRecipient(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = notificationRecipientsRouter;

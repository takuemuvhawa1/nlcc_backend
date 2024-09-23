const express = require('express');
const notificationsRouter = express.Router();
const notificationsDbOperations = require('../cruds/notifications');

notificationsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await notificationsDbOperations.postNotification(postedValues.type, postedValues.theme, postedValues.date, postedValues.time, postedValues.MemberID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notificationsRouter.get('/', async (req, res) => {
    try {
        const results = await notificationsDbOperations.getNotifications();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notificationsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationsDbOperations.getNotificationById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notificationsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await notificationsDbOperations.updateNotification(id, updatedValues.type, updatedValues.theme, updatedValues.date, updatedValues.time, updatedValues.MemberID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notificationsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await notificationsDbOperations.deleteNotification(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = notificationsRouter;

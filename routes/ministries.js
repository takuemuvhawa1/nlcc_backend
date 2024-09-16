const express = require('express');
const ministryRouter = express.Router();
const ministriesDbOperations = require('../cruds/ministries');

ministryRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await ministriesDbOperations.postMinistry(postedValues.Name, postedValues.Description, postedValues.CalendarID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/', async (req, res) => {
    try {
        const results = await ministriesDbOperations.getMinistries();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/ministry-leaders', async (req, res) => {
    try {
        const results = await ministriesDbOperations.getMinistriesJoin();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministriesDbOperations.getMinistryById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await ministriesDbOperations.updateMinistry(id, updatedValues.Name, updatedValues.Description, updatedValues.CalendarID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministriesDbOperations.deleteMinistry(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = ministryRouter;

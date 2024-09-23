const express = require('express');
const sermonsRouter = express.Router();
const sermonsDbOperations = require('../cruds/sermons');

sermonsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await sermonsDbOperations.postSermon(postedValues.name, postedValues.weblink, postedValues.date);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sermonsRouter.get('/', async (req, res) => {
    try {
        const results = await sermonsDbOperations.getSermons();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sermonsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sermonsDbOperations.getSermonById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sermonsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await sermonsDbOperations.updateSermon(id, updatedValues.name, updatedValues.weblink, updatedValues.date);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

sermonsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await sermonsDbOperations.deleteSermon(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = sermonsRouter;

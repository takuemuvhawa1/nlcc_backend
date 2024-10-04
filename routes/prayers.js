const express = require('express');
const prayersRouter = express.Router();
const prayersDbOperations = require('../cruds/prayers');

// Create a new prayer request
prayersRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await prayersDbOperations.postPrayer(
            postedValues.MemberID,
            postedValues.requestnotes
        );
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get all prayer requests
prayersRouter.get('/', async (req, res) => {
    try {
        const results = await prayersDbOperations.getPrayers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get a prayer request by ID
prayersRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await prayersDbOperations.getPrayerById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update a prayer request by ID
prayersRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await prayersDbOperations.updatePrayer(
            id,
            updatedValues.MemberID,
            updatedValues.requestnotes
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete a prayer request by ID
prayersRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await prayersDbOperations.deletePrayer(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = prayersRouter;

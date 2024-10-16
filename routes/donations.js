const express = require('express');
const donationsRouter = express.Router();
const donationsDbOperations = require('../cruds/donations');

// Create a new donation
donationsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await donationsDbOperations.postDonation(postedValues.date, postedValues.item, postedValues.reason, postedValues.memberId);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get all donations
donationsRouter.get('/', async (req, res) => {
    try {
        const results = await donationsDbOperations.getDonations();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get donation by ID
donationsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await donationsDbOperations.getDonationById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get donation by member ID
donationsRouter.get('/member/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await donationsDbOperations.getDonationByMemberId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update donation by ID
donationsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await donationsDbOperations.updateDonation(id, updatedValues.date, updatedValues.item, updatedValues.reason, updatedValues.memberId);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete donation by ID
donationsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await donationsDbOperations.deleteDonation(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = donationsRouter;

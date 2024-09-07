// routes/familyRoutes.js
const express = require('express');
const familyRouter = express.Router();
const familiesDbOperations = require('../cruds/families');

familyRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await familiesDbOperations.postFamily(postedValues.FamilyName, postedValues.Address, postedValues.Phone, postedValues.Email);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

familyRouter.get('/', async (req, res) => {
    try {
        const results = await familiesDbOperations.getFamilies();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

familyRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await familiesDbOperations.getFamilyById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

familyRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await familiesDbOperations.updateFamily(id, updatedValues.FamilyName, updatedValues.Address, updatedValues.Phone, updatedValues.Email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

familyRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await familiesDbOperations.deleteFamily(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = familyRouter;

const express = require('express');
const childrenRouter = express.Router();
const childrenDbOperations = require('../cruds/children');

// Create a new child
childrenRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await childrenDbOperations.postChild(postedValues.parentID, postedValues.name, postedValues.surname, postedValues.dob, postedValues.relationship, postedValues.gender);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get all children
childrenRouter.get('/', async (req, res) => {
    try {
        const results = await childrenDbOperations.getChildren();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get child by ID
childrenRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await childrenDbOperations.getChildById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get children by parent ID
childrenRouter.get('/parent/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await childrenDbOperations.getChildByParentId(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update child by ID
childrenRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await childrenDbOperations.updateChild(id, updatedValues.parentID, updatedValues.name, updatedValues.surname, updatedValues.dob, updatedValues.relationship, updatedValues.gender);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete child by ID
childrenRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await childrenDbOperations.deleteChild(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = childrenRouter;

const express = require('express');
const userRouter = express.Router();
const usersDbOperations = require('../cruds/users'); 

// Create User
userRouter.post('/', async (req, res) => {
    try {
        const { name, surname, email, password, role, phone, address } = req.body;
        let results = await usersDbOperations.postUser(name, surname, email, password, role, phone, address);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await usersDbOperations.authenticateUser(email, password);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get All Users
userRouter.get('/', async (req, res) => {
    try {
        let results = await usersDbOperations.getUsers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get User by ID
userRouter.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await usersDbOperations.getUserById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Update User
userRouter.put('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const { name, surname, email, password, role, phone, address } = req.body;
        let result = await usersDbOperations.updateUser(id, name, surname, email, password, role, phone, address);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Delete User
userRouter.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let result = await usersDbOperations.deleteUser(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = userRouter;

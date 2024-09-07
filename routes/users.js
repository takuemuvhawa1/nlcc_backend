const express = require('express');
const userRouter = express.Router();
const usersDbOperations = require('../cruds/users');


userRouter.post('/', async (req, res, next) => {
    try {
        let postedValues = req.body;
        let code = postedValues.Code;
        let name = postedValues.Name;
        let email = postedValues.email;
        let password = postedValues.Password;
        let isActive = postedValues.IsActive;
        let role = postedValues.Role;
        let profilePic = postedValues.ProfilePic;
        let dob = postedValues.DOB;
        let gender = postedValues.Gender;
        let city = postedValues.City;
        let school = postedValues.School;
        let sLevel = postedValues.SLevel;
        let accountBalance = postedValues.AccountBalance;
        let phoneNo = postedValues.PhoneNo;

        console.log(email);

        let results = await usersDbOperations.postUser(code, name, email, password, isActive, role, profilePic, dob, gender, city, school, sLevel, accountBalance, phoneNo);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

userRouter.get('/', async (req, res, next) => {
    try {
        let results = await usersDbOperations.getUsers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.get('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let result = await usersDbOperations.getUserById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get User By User Credentials
userRouter.get('/:email/:password', async (req, res, next) => {
    try {
        let email = req.params.email;
        let password = req.params.password;
        let result = await usersDbOperations.getUserByCred(email, password);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Get User By User Email
userRouter.get('/user/email/:email', async (req, res, next) => {
    try {
        let email = req.params.email;
        let result = await usersDbOperations.getUserByEmail(email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedValues = req.body;
        let name = updatedValues.Name;
        let email = updatedValues.email;
        let password = updatedValues.Password;
        let isActive = updatedValues.IsActive;
        let role = updatedValues.Role;
        let profilePic = updatedValues.ProfilePic;
        let dob = updatedValues.DOB;
        let gender = updatedValues.Gender;
        let city = updatedValues.City;
        let school = updatedValues.School;
        let sLevel = updatedValues.SLevel;
        let accountBalance = updatedValues.AccountBalance;
        let phoneNo = updatedValues.PhoneNo;

        let result = await usersDbOperations.updateUser(
            id, name, email, password, isActive, role, profilePic, dob, gender, city, school, sLevel, accountBalance, phoneNo
        );
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

userRouter.delete('/:id', async (req, res, next) => {
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
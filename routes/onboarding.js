const express = require('express');
const onBoardingRouter = express.Router();
const onBoardingDbOperations = require('../cruds/onboarding'); 

onBoardingRouter.post('/searchmember', async (req, res) => {
    try {
        const { email } = req.body;
        let result = await onBoardingDbOperations.searchMember(email);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

onBoardingRouter.post('/setpassword', async (req, res) => {
    try {
        const { email, otp, password } = req.body;
        let result = await onBoardingDbOperations.setPassword(email, otp, password);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

onBoardingRouter.post('/resendotp', async (req, res) => {
    try {
        const { email } = req.body;
        let result = await onBoardingDbOperations.resendOtp(email);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Login
onBoardingRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await onBoardingDbOperations.signIn(email, password);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



module.exports = onBoardingRouter;

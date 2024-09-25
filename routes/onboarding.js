const express = require('express');
const onBoardingRouter = express.Router();
const onBoardingDbOperations = require('../cruds/onboarding'); 

const { generateToken, verifyToken } = require('../utilities/jwtUtils');
const authenticateToken = require('../utilities/authenticateToken');

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
// onBoardingRouter.post('/signin', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         let result = await onBoardingDbOperations.signIn(email, password);
//         res.status(result.status).json(result);

//         const results = await ministriesDbOperations.getMinistriesJoin2(memberId);

//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

// Login 
onBoardingRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        let result = await onBoardingDbOperations.signIn(email, password);

        if (result.status === '200') {
            const memberId = result.member.MemberID; 
            const ministries = await onBoardingDbOperations.getMinistriesJoin2(memberId);
            result.member.ministries = ministries; 

            const cellgroups = await onBoardingDbOperations.getCellGroupsJoin(memberId); 
            result.member.cellgroups = cellgroups; 

            // Generate JWT token
            const token = generateToken(result); 
            console.log('TOKEN: ', token);
    
            // Send user data and token in one response
            res.status(result.status).json({
                member: result.member,
                token
            });
            return; 
        }

        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



module.exports = onBoardingRouter;

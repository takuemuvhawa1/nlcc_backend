const express = require('express');
const onBoardingRouter = express.Router();
const onBoardingDbOperations = require('../cruds/onboarding'); 

const crypto = require('crypto');

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

//post member
onBoardingRouter.post('/member', async (req, res) => {
    try {
        const postedValues = req.body;
        console.log(postedValues);
        const results = await onBoardingDbOperations.postMember(postedValues.name, postedValues.surname, postedValues.email, postedValues.phone, postedValues.address, postedValues.country, postedValues.gender, postedValues.registerwith);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

onBoardingRouter.post('/forgotpassword', async (req, res) => {
    try {
        const { email } = req.body;
        let result = await onBoardingDbOperations.forgotPassword(email);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e); 
        res.sendStatus(500);
    }
});

onBoardingRouter.post('/setpassword', async (req, res) => {
    try {
        const { phonemail, otp, password, registerwith } = req.body;

            // Hash the password using MD5
            const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        let result = await onBoardingDbOperations.setPassword(phonemail, otp, hashedPassword, registerwith);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


onBoardingRouter.post('/resetpassword', async (req, res) => {
    try {
        const { email, oldPassword, newPassword, phone } = req.body; 

         // Hash the password using MD5
         const hashedOldPassword = crypto.createHash('md5').update(oldPassword).digest('hex');
         const hashedPassword = crypto.createHash('md5').update(newPassword).digest('hex');

        let result = await onBoardingDbOperations.resetPassword(email, hashedOldPassword, hashedPassword, phone);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


onBoardingRouter.post('/resendotp', async (req, res) => {
    try {
        const { email, phone } = req.body;
        let result = await onBoardingDbOperations.resendOtp(email, phone);
        res.status(result.status).json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

onBoardingRouter.post('/forgotpassword/resendotp', async (req, res) => {
    try {
        const { email, phone } = req.body;
        let result = await onBoardingDbOperations.resendOtpForgotPassword(email, phone);
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

        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        let result = await onBoardingDbOperations.signIn(email, hashedPassword);

        if (result.status === '200') {
            const memberId = result.member.MemberID; 
            const ministries = await onBoardingDbOperations.getMinistriesJoin2(memberId);
            result.member.ministries = ministries; 

            const cellgroups = await onBoardingDbOperations.getCellGroupsJoin(memberId); 
            result.member.cellgroups = cellgroups; 

            // Generate JWT token
            const token = generateToken(result); 
            console.log('TOKEN: ', token);
    
            // Send user data, token, status, and message in one response
            res.status(200).json({
                status: "200",
                message: "Login successful",
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

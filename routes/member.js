const express = require('express');
const memberRouter = express.Router();
const membersDbOperations = require('../cruds/member');

memberRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await membersDbOperations.postMember(postedValues.Name, postedValues.Surname, postedValues.Email, postedValues.Phone, postedValues.Address, postedValues.City, postedValues.Country, postedValues.MembershipStatus, postedValues.ProfilePicture, postedValues.Gender, postedValues.Suburb, postedValues.Zone, postedValues.nxt_of_kin, postedValues.nok_relationship, postedValues.nok_phone, postedValues.emergency_contact, postedValues.emerg_con_relationship, postedValues.emerg_phone);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// memberRouter.post('/details', async (req, res) => {
//     try {
//         const postedValues = req.body;
//         const results = await membersDbOperations.postMemberDetails(
//             postedValues.address,
//             postedValues.city,
//             postedValues.nxt_of_kin,
//             postedValues.nok_relationship,
//             postedValues.nok_phone,
//             postedValues.emergency_contact,
//             postedValues.emerg_con_relationship,
//             postedValues.emerg_phone
//         );
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

memberRouter.put('/details/:memberID', async (req, res) => {
    try {
        const memberID = req.params.memberID; // Get memberID from URL parameters
        const postedValues = req.body;
        const results = await membersDbOperations.updateMemberDetails(
            memberID,
            postedValues.address,
            postedValues.city,
            postedValues.nxt_of_kin,
            postedValues.nok_relationship,
            postedValues.nok_phone,
            postedValues.emergency_contact,
            postedValues.emerg_con_relationship,
            postedValues.emerg_phone
        );
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.put('/preferred/comm/:memberID', async (req, res) => {
    try {
        const memberID = req.params.memberID; // Get memberID from URL parameters
        const postedValues = req.body;
        const results = await membersDbOperations.updateMemberPreferred(
            memberID,
            postedValues.email,
            postedValues.phone,
        );
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


memberRouter.get('/', async (req, res) => {
    try {
        const results = await membersDbOperations.getMembers();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.get('/all/:status', async (req, res) => {
    try {
        const status = req.params.status;
        const results = await membersDbOperations.getMembersByStatus(status);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.get('/preferred/comm/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const results = await membersDbOperations.getMembersByPreferred(id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await membersDbOperations.getMemberById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await membersDbOperations.updateMember(id, updatedValues.Name, updatedValues.Surname, updatedValues.Email, updatedValues.Phone, updatedValues.Address, updatedValues.City, updatedValues.Country, updatedValues.MembershipStatus, updatedValues.ProfilePicture, updatedValues.Gender, updatedValues.Suburb, updatedValues.Zone, updatedValues.nxt_of_kin, updatedValues.nok_relationship, updatedValues.nok_phone, updatedValues.emergency_contact, updatedValues.emerg_con_relationship, updatedValues.emerg_phone);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.put('/profilepic/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await membersDbOperations.updateMember(id, updatedValues.ProfilePicture);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

memberRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await membersDbOperations.deleteMember(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = memberRouter;

const express = require('express');
const ministryRouter = express.Router();
const ministriesDbOperations = require('../cruds/ministries');

ministryRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await ministriesDbOperations.postMinistry(postedValues.Name, postedValues.Description, postedValues.CalendarID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/', async (req, res) => {
    try {
        const results = await ministriesDbOperations.getMinistries();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/ministry-leaders', async (req, res) => {
    try {
        const results = await ministriesDbOperations.getMinistriesJoin();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/ministry-leaders/:memberId', async (req, res) => {
    const memberId = req.params.memberId; 
    try {
        const results = await ministriesDbOperations.getMinistriesJoin2(memberId);
        const response = await Promise.all(results.map(async ministry => {
            const leaderStatus = ministry.LeaderID == memberId; 
            let members = [];
            let joinReq = [];
            let LeaveReq = [];

            // If the user is the leader, fetch all members for this ministry
            if (leaderStatus) {
                members = await ministriesDbOperations.getMembersByMinistryId(ministry.MinistryID);
            }
            if (leaderStatus) {
                joinReq = await ministriesDbOperations.getMembersByMinistryJoinReq(ministry.MinistryID);
            }
            if (leaderStatus) {
                LeaveReq = await ministriesDbOperations.getMembersByMinistryLeaveReq(ministry.MinistryID);
            }

            return {
                id: ministry.MinistryID,
                name: ministry.MinistryName,
                description: ministry.Description,
                leaderID: ministry.LeaderID,
                admin: `${ministry.LeaderName} ${ministry.LeaderSurname}`,
                adminphone: ministry.Phoneno,
                joined: ministry.MemberID ? true : false, 
                leaderStatus: leaderStatus,
                ToatlMembers : members.length,
                members: members,
                joinrequesting : joinReq.length,
                requestingdata: joinReq,
                leaverequesting: LeaveReq.length,
                leavingdata: LeaveReq
            };
        }));

        // Filter the response to include only ministries where leaderStatus is true
        const filteredResponse = response.filter(ministry => ministry.leaderStatus);
        res.json(filteredResponse);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.get('/ministry/:memberId', async (req, res) => {
    const memberId = req.params.memberId; 
    try {
        const results = await ministriesDbOperations.getMinistriesJoin2(memberId);
        
        // Create a map to store unique ministries
        const ministryMap = {};

        results.forEach(ministry => {
            const ministryId = ministry.MinistryID;

            // If the ministry is not in the map, add it
            if (!ministryMap[ministryId]) {
                ministryMap[ministryId] = {
                    id: ministryId,
                    name: ministry.MinistryName,
                    description: ministry.Description,
                    request: ministry.request,
                    joined: ministry.request === "Approved" && ministry.MemberID !== null,
                    PendingLeave: ministry.request === "leave" && ministry.MemberID !== null,
                    // pendingJoin: ministry.request === null && ministry.MemberID,
                    pendingJoin: ministry.request === null && ministry.MemberID !== null,
                    leaderStatus: ministry.LeaderID == memberId,
                    leaders: []
                };
            }

            // Add the leader to the leaders array 
            ministryMap[ministryId].leaders.push({
                leaderID: ministry.LeaderID,
                admin: `${ministry.LeaderName} ${ministry.LeaderSurname}`,
                adminphone: ministry.Phoneno,
                adminemail: ministry.LeaderEmail,
                email_comm: ministry.email_comm, 
                phone_comm: ministry.phone_comm 
            });
        });

        // Convert the map back to an array
        const response = Object.values(ministryMap);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});




ministryRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministriesDbOperations.getMinistryById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Members requesting to Join
ministryRouter.get('/ministry/mem/req/join', async (req, res) => {
    try {
        const result = await ministriesDbOperations.getMembersByMinistryJoinReq2();
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await ministriesDbOperations.updateMinistry(id, updatedValues.Name, updatedValues.Description, updatedValues.CalendarID, updatedValues.LeaderID);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

ministryRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await ministriesDbOperations.deleteMinistry(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = ministryRouter;

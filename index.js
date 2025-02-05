const express = require('express');
require('dotenv').config();
const cors = require('cors');
const https = require('https');
const { Expo } = require('expo-server-sdk'); // Import Expo SDK

const membersDbOperations = require('./cruds/member');

// Auth
const authenticateToken = require('./utilities/authenticateToken');

const pool = require('./cruds/poolapi');

const multer = require('multer');
const axios = require('axios');

const nodemailer = require('nodemailer');
const Imap = require('imap');
const { simpleParser } = require('mailparser');

const path = require('path');
const fs = require('fs');

// Route path
const userRouter = require('./routes/users');
const memberRouter = require('./routes/member');
const familyRouter = require('./routes/families');
const memberFamilyRouter = require('./routes/memberFamilies');
const attendanceRouter = require('./routes/attendance');
const contributionRouter = require('./routes/contributions');
const pledgeRouter = require('./routes/pledges');
const eventRegistrationRouter = require('./routes/eventRegistrations');
const volunteerOpportunityRouter = require('./routes/volunteerOpportunities');
const volunteerSignupRouter = require('./routes/volunteerSignups');
const volunteerSignupAttendanceRouter = require('./routes/volunteerSignupAttendance');
const ministryRouter = require('./routes/ministries');
const ministryLeaderRouter = require('./routes/ministryLeaders');
const smallGroupsRouter = require('./routes/smallGroups');
const smallGroupLeadersRouter = require('./routes/smallGroupLeaders');
const memberSmallGroupsRouter = require('./routes/memberSmallGroups');
const eventRouter = require('./routes/events');
const regAttendanceRouter = require('./routes/reg_attendance');
const projectsRouter = require('./routes/projects');
const mailerRouter = require('./routes/mailer');
const onBoardingRouter = require('./routes/onboarding');
const eventTasksRouter = require('./routes/events_tasks');
const notificationsRouter = require('./routes/notifications');
const sermonsRouter = require('./routes/sermons');
const memberMinistryRouter = require('./routes/memberMinistries');
const volunteerTasksRouter = require('./routes/volunteer_tasks');
const prayersRouter = require('./routes/prayers');
const childrenRouter = require('./routes/children');
const donationsRouter = require('./routes/donations');
const notificationRecipientsRouter = require('./routes/notificationRecipients');

const app = express();
app.use(express.json());
app.use(cors());

//App Route Usage
app.use('/users', userRouter);
app.use('/members', memberRouter);
app.use('/children', childrenRouter);
app.use('/families', familyRouter);
app.use('/memberfamily', memberFamilyRouter);
app.use('/attendance', attendanceRouter);
app.use('/contributions', contributionRouter);
app.use('/donations', donationsRouter);
app.use('/pledges', pledgeRouter);
app.use('/eventreg', eventRegistrationRouter);
app.use('/events', eventRouter);
app.use('/events-tasks', eventTasksRouter);
app.use('/volunteer-tasks', volunteerTasksRouter);
app.use('/volunteeropp', volunteerOpportunityRouter);
app.use('/volunteersignup', volunteerSignupRouter);
app.use('/volattendance', volunteerSignupAttendanceRouter);
app.use('/ministries', ministryRouter);
app.use('/ministryleaders', ministryLeaderRouter);
app.use('/ministrymembers', memberMinistryRouter);
app.use('/smallgroups', smallGroupsRouter);
app.use('/smallgroupleaders', smallGroupLeadersRouter);
app.use('/membersmallgrp', memberSmallGroupsRouter);
app.use('/regatt', regAttendanceRouter);
app.use('/projects', projectsRouter);
app.use('/mailer', mailerRouter);
app.use('/onboarding', onBoardingRouter);
app.use('/notifications', notificationsRouter);
app.use('/notification-reci', notificationRecipientsRouter);
app.use('/sermons', sermonsRouter);
app.use('/prayer-req', prayersRouter);

// app.use('/users', userRouter);
// app.use('/members', authenticateToken, memberRouter);
// app.use('/children', authenticateToken, childrenRouter);
// app.use('/families', authenticateToken, familyRouter);
// app.use('/memberfamily', authenticateToken, memberFamilyRouter);
// app.use('/attendance', authenticateToken, attendanceRouter);
// app.use('/contributions', authenticateToken, contributionRouter);
// app.use('/donations', authenticateToken, donationsRouter);
// app.use('/pledges', authenticateToken, pledgeRouter);
// app.use('/eventreg', authenticateToken, eventRegistrationRouter);
// app.use('/events', authenticateToken, eventRouter);
// app.use('/events-tasks', authenticateToken, eventTasksRouter);
// app.use('/volunteer-tasks', authenticateToken, volunteerTasksRouter);
// app.use('/volunteeropp', authenticateToken, volunteerOpportunityRouter);
// app.use('/volunteersignup', authenticateToken, volunteerSignupRouter);
// app.use('/volattendance', authenticateToken, volunteerSignupAttendanceRouter);
// app.use('/ministries', authenticateToken, ministryRouter);
// app.use('/ministryleaders', authenticateToken, ministryLeaderRouter);
// app.use('/ministrymembers', authenticateToken, memberMinistryRouter);
// app.use('/smallgroups', authenticateToken, smallGroupsRouter);
// app.use('/smallgroupleaders', authenticateToken, smallGroupLeadersRouter);
// app.use('/membersmallgrp', authenticateToken, memberSmallGroupsRouter);
// app.use('/regatt', authenticateToken, regAttendanceRouter);
// app.use('/projects', authenticateToken, projectsRouter);
// app.use('/mailer', mailerRouter);
// app.use('/onboarding', onBoardingRouter);
// app.use('/notifications', authenticateToken, notificationsRouter);
// app.use('/notification-reci', authenticateToken, notificationRecipientsRouter);
// app.use('/sermons', authenticateToken, sermonsRouter);
// app.use('/prayer-req', authenticateToken, prayersRouter);

// Push Notification Route
app.post('/send-notification', async (req, res) => {
  const { tokens, title, body } = req.body;
  let expo = new Expo();

  // Create messages for each token
  let messages = [];
  for (let pushToken of tokens) {
    // Check if the token is valid
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Invalid push token: ${pushToken}`);
      continue;
    }
    messages.push({
      to: pushToken,
      sound: 'default',
      title: title,
      body: body,
      data: { withSome: 'data' },
    });
  }

  // Send notifications
  let chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
        res.status(200).send('Notifications sent successfully.');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error sending notifications.');
      }
    }
  })();
});


//FILE UPLOADS
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = function (req, file, cb) {
  cb(null, true); // Allow all file types
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const uploadedFilename = req.file.filename;
  console.log('File uploaded:', uploadedFilename);

  res.status(200).send(`File uploaded successfully. Filename: ${uploadedFilename}`);
});

//Upload profile pic
app.post('/upload/:id', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const uploadedFilename = req.file.filename;
  console.log('File uploaded:', uploadedFilename);

  try {
    const id = req.params.id;
    const updatedValues = { ProfilePicture: `${pool}/file/` + uploadedFilename };
    // console.log("id: ", id);
    // console.log("ProfilePicture: ", uploadedFilename);
    const result = await membersDbOperations.updateMemberProfilePic(id, updatedValues.ProfilePicture);

    res.status(200).json({
      Filename: `${pool}/file/${uploadedFilename}`,
      result: result
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

// Set up a route for file retrieval
app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found.');
  }

  // Stream the file as the response
  res.sendFile(filePath);
});

// Endpoint for downloading files
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.download(filePath, (err) => {
    if (err) {
      console.error('Error downloading file:', err);
      res.status(404).send('File not found.');
    }
  });
});

// const options = {
//   cert: fs.readFileSync(`${process.env.HOME}/cert/cert.pem`),
//   key: fs.readFileSync(`${process.env.HOME}/cert/key.pem`)
// };

// https.createServer(options, app).listen(process.env.APPPORT || '3003', () => {
//   console.log('app is listening to port' + process.env.APPPORT);
// });

// Load SSL certificates
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/srv702611.hstgr.cloud/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/srv702611.hstgr.cloud/fullchain.pem')
// };

// // Create HTTPS server
// const PORT = process.env.APPPORT || '3003';
// https.createServer(options, app).listen(PORT, () => {
//   console.log(`App is listening on https://srv702611.hstgr.cloud:${PORT}`);
// });

// Local Server
app.listen(process.env.APPPORT || '3003', () => {
  console.log('app is listening to port' + process.env.APPPORT);
});
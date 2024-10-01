const express = require('express');
require('dotenv').config();
const cors = require('cors');
const https = require('https');

const membersDbOperations = require('./cruds/member'); 

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

const app = express();
app.use(express.json());
app.use(cors());

//App Route Usage
app.use('/users', userRouter);
app.use('/members', memberRouter);
app.use('/families', familyRouter);
app.use('/memberfamily', memberFamilyRouter);
app.use('/attendance', attendanceRouter);
app.use('/contributions', contributionRouter);
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
app.use('/sermons', sermonsRouter);

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
      const updatedValues = { ProfilePicture: `${pool}/file/`+ uploadedFilename }; 
      // console.log("id: ", id);
      // console.log("ProfilePicture: ", uploadedFilename);
      const result = await membersDbOperations.updateMemberProfilePic(id, updatedValues.ProfilePicture);

      res.status(200).json({
          message: `File uploaded successfully. Filename: ${uploadedFilename}`,
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

app.listen(process.env.APPPORT || '3003', () => {
  console.log('app is listening to port' + process.env.APPPORT);
});
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const https = require('https');

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
app.use('/events', eventRouter)
app.use('/volunteeropp', volunteerOpportunityRouter);
app.use('/volunteersignup', volunteerSignupRouter);
app.use('/volattendance', volunteerSignupAttendanceRouter);
app.use('/ministries', ministryRouter);
app.use('/ministryleaders', ministryLeaderRouter);
app.use('/smallgroups', smallGroupsRouter);
app.use('/smallgroupleaders', smallGroupLeadersRouter);
app.use('/membersmallgrp', memberSmallGroupsRouter);
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
  const filePath = path.join(__dirname, 'uploads', filename); // Adjust the path as needed

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
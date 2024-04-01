const express = require('express')
const frontend = express.Router();
const xlsx = require('xlsx');
const path = require('path');
const Agent = require('../models/Agent.js')
const Property = require('../models/Property.js')
require('dotenv').config();

const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const propertyId = '434629357';
const analyticsDataClient = new BetaAnalyticsDataClient();

async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'averageSessionDuration',
        },
        {
          name: 'screenPageViews',
        },
        {
          name: 'sessions',
        },
        {
          name: 'activeUsers',
        },
        {
          name: 'newUsers',
        },
      ],
    });
    
    let averageSessionDuration, screenPageViews, sessions, activeUsers, newUsers;
    // Extract the metric values from the response
    if (response.rows.length > 0) {
      const metricValues = response.rows[0].metricValues;
      averageSessionDuration = metricValues[0].value;
      screenPageViews = metricValues[1].value;
      sessions = metricValues[2].value;
      activeUsers = metricValues[3].value;
      newUsers = metricValues[4].value;
     } else {
      averageSessionDuration = 0;
      screenPageViews = 0;
      sessions = 0;
      activeUsers = 0;
      newUsers = 0;
     }
  
    return {
      averageSessionDuration,
      screenPageViews,
      sessions,
      activeUsers,
      newUsers
    };
  }

frontend.get('/', async function (req, res) {
    try {

        const agents = await Agent.find().limit(3).lean();
        const soldProperty = await Property.find({ status: "Sold" }).limit(4).lean();
        const latestProperty = await Property.find().sort({ dateCreated: -1 }).limit(4).lean();
        const rentBanner= await Property.find({ status: "Rent" }).limit(2).lean();
        res.render('user-home', {agents, soldProperty, latestProperty, rentBanner});
    } catch (error) {
        res.status(500).send('Error fetching data from the database.');
    }    
  
});

frontend.get('/about-us', async function (req, res) {
    try{
        const {averageSessionDuration, screenPageViews, sessions, activeUsers, newUsers} = await runReport();
        const propertiescount = await Property.countDocuments();
        const agentscount= await Agent.countDocuments();

        res.render('user-about',{propertiescount, agentscount, newUsers});
    } catch (error) {
        console.log(error)
        res.status(500).send('Error fetching total count from the database.');
    }    
});

frontend.get('/contact', async function (req, res) {
    res.render('user-contact');
});

const workbookPath = path.join(__dirname, '../data/inquiries.xlsx');

frontend.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body; // Extract data from form submission

  // Load or initialize the workbook
  let workbook;
  try {
      workbook = xlsx.readFile(workbookPath);
  } catch (error) {
      // If the workbook does not exist, create a new one
      workbook = xlsx.utils.book_new();
      workbook.SheetNames.push('Submissions');
      const worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Email', 'Subject', 'Message']]);
      workbook.Sheets['Submissions'] = worksheet;
  }

  // Load the worksheet
  const worksheet = workbook.Sheets['Submissions'];

  // Find the next empty row
  const ref = worksheet['!ref'];
  const range = xlsx.utils.decode_range(ref);
  const newRow = range.e.r + 1; // Assumes data starts at first row

  // Append new data
  xlsx.utils.sheet_add_aoa(worksheet, [[name, email, subject, message]], {origin: {r: newRow, c: 0}});

  // Update the range of the worksheet
  worksheet['!ref'] = xlsx.utils.encode_range(range.s, {r: newRow, c: range.e.c});

  // Save the workbook
  try {
      xlsx.writeFile(workbook, workbookPath);
      res.status(200).send('Your message has been received. Thank you!');
  } catch (writeError) {
      console.error(writeError);
      res.status(500).send('An error occurred while saving your message.');
  }
});


frontend.get('/properties', async function (req, res) {
    try{
        const luzon= await Property.find({ archipelago: "Luzon" }).lean();
        const visayas= await Property.find({ archipelago: "Visayas" }).lean();
        const mindanao= await Property.find({ archipelago: "Mindanao" }).lean();

        res.render('user-property',{luzon, visayas, mindanao});
    } catch (error) {
        res.status(500).send('Error fetching properties from the database.');
    }    
});


frontend.get('/properties/:id', async function (req, res) {
    const propertyId = req.params.id
    try{
        const property = await Property.findById(propertyId).lean();
        if (!property) {
            return res.status(404).send('Property not found.');
        }
        res.render('user-propertydetails',{property});
    } catch (error) {
        res.status(500).send('Error fetching property details from the database.');
    }    
});

frontend.get('/services', async function (req, res) {
    res.render('user-service');
});

frontend.get('/agents', async function (req, res) {
    try{
        const agents= await Agent.find().lean();

        res.render('user-agent',{agents});
    } catch (error) {
        res.status(500).send('Error fetching agents from the database.');
    }    

    
});

module.exports = frontend;
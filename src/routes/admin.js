const express = require('express')
const admin = express.Router();
const sessionChecker = require('../middleware/authmiddleware');
require('dotenv').config();

const { BetaAnalyticsDataClient } = require('@google-analytics/data');
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
    averageSessionDuration = parseFloat(averageSessionDuration).toFixed(2);
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

admin.get('/', sessionChecker, async function (req, res) {
  const { averageSessionDuration, screenPageViews, sessions, activeUsers, newUsers } = await runReport();

  // Pass the metric values to your view
  res.render('admin-menu', { averageSessionDuration, screenPageViews, sessions, activeUsers, newUsers });
});

// Admin Inquiries CRUD Page
admin.get('/inquiries', sessionChecker, async function (req, res) {
  res.render('admin-inquiries');
});

admin.get('/download-inquiries', (req, res) => {
  const file = `${__dirname}/../data/inquiries.xlsx`; // Adjust the path to where xlsx file is located
  res.download(file); // Set the correct path for file
});

admin.get('/logout', sessionChecker, async function (req, res) {
  // Clear the session data
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error logging out.');
    }
    // Redirect to the login page or another appropriate page
    res.redirect('/admin/login');
  });
});

module.exports = admin;
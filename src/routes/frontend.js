const express = require('express')
const frontend = express.Router();
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
        [averageSessionDuration, screenPageViews, sessions, activeUsers, newUsers] = response.rows[0].metricValues;
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
        res.render('user-home', {agents, soldProperty, latestProperty});
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
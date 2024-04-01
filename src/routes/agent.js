const express = require('express')
const Agent = require('../models/Agent.js')
const agent = express.Router();
const multer = require('multer')
const sessionChecker = require('../middleware/authmiddleware');

const upload = multer({ storage: multer.memoryStorage() });

// Agents List (Read)
agent.get('/', sessionChecker, async function (req, res) {
    try {

        const agents = await Agent.find().lean();

        res.render('admin-agents', { agents });
    } catch (error) {
        res.status(500).send('Error fetching agents from the database.');
    }
});

// Add Agent (Create)

// Frontend
agent.get('/add', sessionChecker, async function (req, res) {
    res.render('admin-newagent');
});

// Backend
agent.post('/add', upload.single('imageUpload'), async function (req, res) {

    const { agentName, agentEmail, agentEducation, agentFB, agentX, agentInstagram, agentLinkedIn} = req.body;
    if (!agentName || !agentEmail || !agentEducation || !agentFB || !agentX || !agentInstagram || !agentLinkedIn) {
        return res.status(400).send('Please provide the necessary information.');
    }
    console.log(req.file);
    try {
        const existingAgent = await Agent.findOne({ agentName });

        if (existingAgent) {
            return res.status(409).send('Agent already exists in the database.');
        }
        
        // Convert the uploaded image to base64
        const imageBase64 = req.file ? Buffer.from(req.file.buffer).toString('base64') : null;
        //console.log(imageBase64);
        const newAgent = new Agent({
            name: agentName,
            email: agentEmail,
            education: agentEducation,
            fb: agentFB,
            x: agentX,
            instagram: agentInstagram,
            linkedin: agentLinkedIn,
            image: imageBase64,
        });

        await newAgent.save();
        res.redirect('/admin/agents/');
        console.log("Successfully added agent")
    } catch (error) {
        console.log(error)
        res.status(500).send('Error registering the agent.');
        console.log("Error adding agent")
    }
});

// Edit Agent (Update)
// Frontend
agent.get('/edit/:id', sessionChecker, async function (req, res) {
    const agentId = req.params.id
    try {
        const agent = await Agent.findById(agentId).lean();
        if (!agent) {
            return res.status(404).send('Agent not found.');
        }
        // Pass the agent data to the template
        res.render('admin-editagent', { agent });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching the agent.');
    }
});

// Backend
agent.post('/edit/:id', upload.single('imageUpload'), async function (req, res) {

    const agentId = req.params.id
    const { agentName, agentEmail, agentEducation, agentFB, agentX, agentInstagram, agentLinkedIn} = req.body;
    let imageBase64 = null;

    if (req.file) {
        // Convert the uploaded image to base64
        imageBase64 = Buffer.from(req.file.buffer).toString('base64');
    }

    try {
        // Find the existing agent
        const agent = await Agent.findById(agentId);
        if (!agent) {
            return res.status(404).send('Agent not found.');
        }

        // Update the agent's fields with the new data if it's provided
        if (agentName) agent.name = agentName;
        if (agentEmail) agent.email = agentEmail;
        if (agentEducation) agent.education = agentEducation;
        if (agentFB) agent.fb = agentFB;
        if (agentX) agent.x = agentX;
        if (agentInstagram) agent.instagram = agentInstagram;
        if (agentLinkedIn) agent.linkedin = agentLinkedIn;
        if (imageBase64) agent.image = imageBase64;

        // Save the updated agent back to the database
        await agent.save();

        res.redirect('/admin/agents/');
        console.log("edit success")
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating the agent.');
        console.log("edit failed")
    }
});

// Delete Agent (Delete)
agent.post('/delete/:id', async function (req, res) {
    const agentId = req.params.id;
    //console.log(userId);
    try {
        const deletedUser = await Agent.findByIdAndDelete(agentId);
        if (!deletedUser) {
            res.status(404).send('Agent not found');
        }
        res.redirect('/admin/agents/');
    } catch (error) {
        console.log(error)
        res.status(500).send('Error deleting the agents.');
    }
});

module.exports = agent;

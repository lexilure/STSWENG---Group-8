const Agents = require('../models/properties')
// Set up express routers
const express = require('express');
const router = express.Router();


// Add agent
router.post('/addagent', async (req, res) => {
    const { name, email, contact, description, photo } = req.body
    const agent = new Agents({name, email, contact, description, photo})

    // Create  and save new Agent dcoument
    try {
        await agent.save();
        res.status(200).send("Agent added successfully");
    } catch (e) {
        res.status(500).send("Server error. Unable to add agent: " + e)
    }

})

// Get agent
router.get('/getagent', async (req, res) => {
    const {name} = req.body

    try {
        const agent = await Agents.findOne({ name: name }).lean().exec();
        res.status(200).json(agent);
    } catch (e) {
        res.status(400).send("Unable to find agent.");
    }
})


// Get all agents
router.get('/getallagents', async (req,res) => {
    let agents
    try {
        agents = await Agents.find().lean().exec()
        res.status(200).json(agents)
    } catch (e) {
        res.status(400).send("Error in getting agents: " + e);
    }
})

// Update an agent
router.post('/updateagent', async (req, res) => {
    const { name, email, contact, description, photo } = req.body

    try {
        const agent = await findOneAndUpdate({ name: name }, { email: email, contact: contact, description: description}, {
            new: true
        }).lean().exec()
        res.status(200).json(agent)
    } catch (e) {
        res.status(500).send("Error in updating agent: " + e)
    }
})


// Delete an agent
router.post('/deleteagent', async (req, res) => {
    const status = await Agents.deleteOne({ name: req.body.name })
    if (!status)
        res.status(500).send("Error occured during deletion")
    else 
        res.status(200).send("Agent deleted.")
})

module.exports = router
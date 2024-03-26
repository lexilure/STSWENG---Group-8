const Properties = require('../models/properties')
// Set up express routers
const express = require('express');
const router = express.Router();

// Add a Property
router.post('/addproperty', async (req, res) => {
    const { name, type, area, beds, baths, garages, description, images } = req.body;
    const property = new Properties({ name, type, area, beds, baths, garages, description, images});

    try {
        await property.save();
        res.status(201).send(property);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get a property
router.get('/getproperty', async (req, res) => {
    const {name} = req.body;
    try {
        const property = await Properties.find({name: name}).lean().exec();
    } catch (error) {
        res.status(400).send("Property not found")
    }
    res.status(200).send(property)
})

// Get all properties
router.get('/getallproperties', async (req, res) =>{
    let property
    try {
        property = await Properties.find().lean().exec();
    } catch (e) {
        res.status(400).send(e);
    }
    res.status(200).send(property)
})

// Update a property
router.post('/updateproperties', async (req, res) =>{
    const { name, type, area, beds, baths, garages, description, images } = req.body;

    try {
        const property = await Properties.findOneAndUpdate({name: name}, {type: type, area:area, beds:beds, baths:baths, garages:garages, description:description}, {
            new: true
        })
        res.status(200).send(property)
    } catch (e) {
        res.status(400).send(e);
    }
})


// Delete a property (might need the property name)
router.post('/deleteproperty', async (req, res) => {
    const status = await Properties.deleteOne({name: req.body.name})
    if (!status) {
        res.status(400).send("Error occurred during deleting");
    } else {
        res.status(200).send("Property Deleted");
    }
})

module.exports = router;

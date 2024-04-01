const express = require('express')
const Property = require('../models/Property.js')
const property = express.Router();
const multer = require('multer')
const sessionChecker = require('../middleware/authmiddleware');
const upload = multer({ storage: multer.memoryStorage() });

property.get('/', sessionChecker, async function (req, res) {
    try {

        const properties = await Property.find().lean();

        res.render('admin-properties', { properties });
    } catch (error) {
        res.status(500).send('Error fetching properties from the database.');
    }
});


// Add Property  (Create)

// Frontend
property.get('/add', sessionChecker, async function (req, res) {
    res.render('admin-newproperty');
});

//Backend
property.post('/add', upload.single('imageUpload'), async function (req, res) {

    const { propertyName, propertyArchipelago, propertyAddress, propertyPrice, propertyStatus, lotSize, floorSize, numFloors, numRooms, additionalFeatures } = req.body;
    if (!propertyName || !propertyArchipelago || !propertyAddress || !propertyPrice || !propertyStatus || !lotSize || !floorSize || !numFloors || !numRooms || !additionalFeatures) {
        console.log("here");
        res.redirect('/admin/properties/add');
        return res.status(400).send('Please provide the necessary information.');
    }
    //console.log(req.file);
    try {
        const existingProperty = await Property.findOne({ propertyName });

        if (existingProperty) {
            res.redirect('/admin/properties/add');
            return res.status(409).send('Property already exists in the database.');
        }
        
        // Check if the user uploaded an image
        let imageBase64 = null;
        if (req.file) {
            // Convert the uploaded image to base64
            imageBase64 = Buffer.from(req.file.buffer).toString('base64');
        } else {
            res.redirect('/admin/properties/add');
        }
        const newProperty = new Property({
            name: propertyName,
            archipelago: propertyArchipelago,
            address: propertyAddress,
            price: propertyPrice,
            status: propertyStatus,
            lotsize: lotSize,
            floorsize: floorSize,
            floornum: numFloors,
            roomnum: numRooms,
            additionalfeatures: additionalFeatures,
            datecreated: Date.now(),
            image: imageBase64
        });

        await newProperty.save();
        res.redirect('/admin/properties/');
        console.log("Successfully added property")
    } catch (error) {
        console.log(error)
        res.status(500).send('Error registering the property.');
        console.log("Error adding property")
    }
});



// Edit Property (Update)
property.get('/edit/:id', sessionChecker, async function (req, res) {
    const propertyId = req.params.id
    try {
        const property = await Property.findById(propertyId).lean();
        if (!property) {
            return res.status(404).send('Property not found.');
        }
        // Pass the property data to the template
        res.render('admin-editproperty', { property });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error fetching the property.');
    }
});


// Backend
property.post('/edit/:id', upload.single('imageUpload'), async function (req, res) {

    const propertyId = req.params.id
    const { propertyName, propertyArchipelago, propertyAddress, propertyPrice, propertyStatus, lotSize, floorSize, numFloors, numRooms, additionalFeatures } = req.body;
    let imageBase64 = null;

    if (req.file) {
        // Convert the uploaded image to base64
        imageBase64 = Buffer.from(req.file.buffer).toString('base64');
    }

    try {
        // Find the existing agent
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).send('Property not found.');
        }

        // Update the agent's fields with the new data if it's provided
        if (propertyName) property.name = propertyName;
        if (propertyArchipelago) property.archipelago = propertyArchipelago;
        if (propertyAddress) property.address = propertyAddress;
        if (propertyPrice) property.price = propertyPrice;
        if (propertyStatus) property.status = propertyStatus;
        if (lotSize) property.lotsize = lotSize;
        if (floorSize) property.floorsize = floorSize;
        if (numFloors) property.floornum = numFloors;
        if (numRooms) property.roomnum= numRooms;
        if (additionalFeatures) property.additionalfeatures = additionalFeatures;
        if (imageBase64) property.image = imageBase64;

        // Save the updated agent back to the database
        await property.save();
        res.redirect('/admin/properties/');
        console.log("edit success")
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating the agent.');
        console.log("edit failed")
    }
});

// Delete Property (Delete)
property.post('/delete/:id', async function (req, res) {
    const propertyId = req.params.id;
    //console.log(userId);
    try {
        const deletedProperty = await Property.findByIdAndDelete(propertyId);
        if (!deletedProperty) {
            res.status(404).send('Property not found');
        }
        res.redirect('/admin/properties/');
    } catch (error) {
        console.log(error)
        res.status(500).send('Error deleting the property.');
    }
});

module.exports = property;
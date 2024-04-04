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
        return  res.redirect('/admin/properties/add');
    }
    try {
        const existingProperty = await Property.findOne({ propertyName });

        if (existingProperty) {
            return res.redirect('/admin/properties/add');
        }
        
        // Check if the user uploaded an image
        let imageBase64 = null;
        if (req.file) {
            // Convert the uploaded image to base64
            imageBase64 = Buffer.from(req.file.buffer).toString('base64');
        } else {
            return res.redirect('/admin/properties/add');
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
        return res.redirect('/admin/properties/');
    } catch (error) {
        return res.status(500).send('Error registering the property.');
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
        return res.redirect('/admin/properties/');
    } catch (error) {
        return res.status(500).send('Error updating the agent.');
    }
});

// Delete Property (Delete)
property.post('/delete/:id', async function (req, res) {
    const propertyId = req.params.id;
    try {
        const deletedProperty = await Property.findByIdAndDelete(propertyId);
        if (!deletedProperty) {
            return res.status(404).send('Property not found');
        }
        res.redirect('/admin/properties/');
    } catch (error) {
        return res.status(500).send('Error deleting the property.');
    }
});

module.exports = property;
const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller.js')

// Import the contact form controller
const contactFormController = require('../controllers/contact.js');

// Home Page
router.get('/', controller.home)

// About Us Page
router.get('/about-us', controller.about)

// Contact Page
router.get('/contact', controller.contact);

// Add the POST route for the contact form submission
router.use('/forms', contactFormController);

// Route for downloads
router.get('/download-inquiries', (req, res) => {
    const file = `${__dirname}/../data/inquiries.xlsx`; // Adjust the path to where xlsx file is located
    res.download(file); // Set the correct path for file
});

// Property Page
router.get('/properties', controller.property)

// Services Page
router.get('/services', controller.service)

// Login Page
router.get('/admin-login', controller.login)

// Menu Page
router.get('/admin-menu', controller.menu)

// Admin Properties CRUD Page
router.get('/admin-properties', controller.admin_properties)

// Admin Inquiries CRUD Page
router.get('/admin-inquiries', controller.admin_inquiries)

module.exports = router;
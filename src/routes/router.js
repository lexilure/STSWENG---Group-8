const express = require('express')
const router = express.Router();
const controller = require('../controllers/controller.js')

// Home Page
router.get('/', controller.home)

// About Us Page
router.get('/about-us', controller.about)

// Contact Page
router.get('/contact', controller.contact)

// Property Page
router.get('/properties', controller.property)

// Propertydetails Page
router.get('/propertydetails', controller.propertydetails)

// Services Page
router.get('/services', controller.service)

// Agents Page
router.get('/agents', controller.agents)

// Admin adding Agents Page
router.get('/adminAgent', controller.adminAgent)

// Login Page
router.get('/admin-login', controller.login)

// Menu Page
router.get('/admin-menu', controller.menu)

// Admin Properties CRUD Page
router.get('/admin-properties', controller.admin_properties)

// Admin Inquiries CRUD Page
router.get('/admin-inquiries', controller.admin_inquiries)

router.get('/adminCRUD', controller.adminCRUD)

module.exports = router;
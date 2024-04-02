const express = require('express')
const User = require('../models/user.js')
const user = express.Router();
const bcrypt = require('bcryptjs');
const sessionChecker = require('../middleware/authmiddleware');



// User List (Read)
user.get('/', sessionChecker, async function (req, res) {
    try {

        const users = await User.find().lean();

        res.render('admin-users', { users });
    } catch (error) {
        res.status(500).send('Error fetching users from the database.');
    }
});

// Add User Page (Create)

// Frontend
user.get('/add', sessionChecker, async function (req, res) {
    res.render('admin-newuser');
});


// Backend
user.post('/add', async function (req, res) {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.redirect('/admin/users/add');
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.redirect('/admin/users/add');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username: username,
            password: hash,
        });

        await newUser.save();

        res.redirect('/admin/users/');
    } catch (error) {
        res.status(500).send('Error registering the user.');
    }
});

// Delete User (Delete)

user.post('/delete/:id', async function (req, res) {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).send('User not found');
        }
        res.redirect('/admin/users/');
    } catch (error) {
        res.status(500).send('Error deleting the user.');
    }
});

// Edit User (Update)
//user.get('/edit', controller.admin_edituser)

module.exports = user;
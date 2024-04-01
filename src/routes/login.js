const express = require('express')
const User = require('../models/user.js')
const login = express.Router();
const bcrypt = require('bcryptjs');


// Login (Read)

// Frontend
login.get('/', async function (req, res) {
    res.render('admin-login');
});


// Backend
login.post('/', async function (req, res) {

    const { username, password } = req.body;
    console.log(req.body)
    if (!username || !password) {
        console.log("No Username or Password")
        res.redirect('/admin/');
        return res.status(400).send('Please provide username and password.');
    }

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            console.log("No Username or Password")
            res.redirect('/admin/');
            return res.status(409).send('Username does not exist in the database.');
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            console.log("Incorrect Password")
            res.redirect('/admin/');
            return res.status(401).send('Incorrect Username.');
        }

        req.session.user = {
            id: existingUser._id,
            username: existingUser.username
        };
        console.log("Login Successful")
        res.redirect('/admin/');
    } catch (error) {
        console.log(error)
        res.status(500).send('Error logging in.');
    }
});

module.exports = login;
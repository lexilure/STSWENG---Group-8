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

    if (!username || !password) {
        return res.redirect('/admin/login');
    }

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.redirect('/admin/login');
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.redirect('/admin/login'); 
        }

        req.session.user = {
            id: existingUser._id,
            username: existingUser.username
        };
        return res.redirect('/admin/'); 
    } catch (error) {
        return res.redirect('/admin/login');
    }
});

module.exports = login;
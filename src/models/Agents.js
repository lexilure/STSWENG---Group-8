const mongoose = require('mongoose');


const agentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true 
    },
    photo: {
        // Add photo functionalities later
        type: Buffer,
    }


})
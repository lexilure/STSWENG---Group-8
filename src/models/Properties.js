const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    area: {
        type: Number, 
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number, 
        required: true
    },
    garages: {
        type: Number,
    },
    description: {
        type: String,
        required: true
    },
    Images: {
        // Property to accept images
        type: Buffer,
    }
})

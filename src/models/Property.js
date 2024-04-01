const { Schema, SchemaTypes, model } = require('mongoose');

const propertySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    archipelago:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
        unique: true,
    },
    price:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    lotsize:{
        type: String,
        required: true,
    },
    floorsize:{
        type: String,
        required: true,
    },
    floornum:{
        type: String,
        required: true,
    },
    roomnum:{
        type: String,
        required: true,
    },
    additionalfeatures:{
        type: String,
    },
    image:{
        type: String,
        required: true,
    },
    datecreated:{
        type: Date,
    }
});

const Property = model('property', propertySchema); 

module.exports = Property;
const { Schema, SchemaTypes, model } = require('mongoose');

const agentSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    education:{
        type: String,
        required: true,
    },
    fb:{
        type: String,
        required: true,
    },
    x:{
        type: String,
        required: true,
    },
    instagram:{
        type: String,
        required: true,
    },
    linkedin:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
});

const Agent = model('agent', agentSchema); 

module.exports = Agent;
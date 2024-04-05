const mongoose = require('mongoose');

function connect() {
    return mongoose.connect(process.env.MONGODB_URI, { 
        maxPoolSize: 10 // This is the max number of connections in the pool
    });
}

module.exports = connect;
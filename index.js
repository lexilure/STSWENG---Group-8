const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const connect = require('./src/models/db.js');

dotenv.config();
const app = express();

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Static Files
app.use(express.static('public'));

// Templating Engine
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    helpers: {
        formatDate: function(date) {
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//router
const router = require('./src/routes/router.js');
app.use('/', router);


// MongoDB connection
app.listen(process.env.SERVER_PORT, async function() {
    console.log(`express app is now listening on port ${process.env.SERVER_PORT}`);
        try {
            await connect();
            console.log(`Now connected to MongoDB`);

        } catch (err) {
            console.log('Connection to MongoDB failed: ');
            console.error(err);
        }
});

const dotenv = require('dotenv');
const express = require('express');
const exphbs = require('express-handlebars');
const connect = require('./src/models/db.js');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session)

dotenv.config();
const app = express();


app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    store: new RedisStore(options),
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static Files
app.use(express.static('public'));

// Templating Engine
app.engine("hbs", exphbs.engine({
    extname: "hbs", 
    helpers: {
        formatDate: function(date) {
            return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        },
        eq: function(a, b) {
            return a === b;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

//user views router
const frontend = require('./src/routes/frontend.js');
app.use('/', frontend);

// admin views router

//general admin router
const admin = require('./src/routes/admin.js');
app.use('/admin', admin);

//login router
const login = require('./src/routes/login.js');
app.use('/admin/login', login);

//admin user router
const user = require('./src/routes/user.js');
app.use('/admin/users', user);

//admin property router
const property = require('./src/routes/property.js');
app.use('/admin/properties', property);

//admin agent router
const agent = require('./src/routes/agent.js');
app.use('/admin/agents', agent);


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

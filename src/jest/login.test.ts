const request = require('supertest');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const User = require('../models/User');
const app = express();
const loginRouter = require('../routes/login');

// Mock the User model
jest.mock('../models/User');
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loginRouter);

describe('POST /admin/login/', () => {
    beforeAll(() => {
        // Mock User.findOne to return a user object for a specific username
        User.findOne.mockImplementation((username) => {
            if (username === 'test') {
                return Promise.resolve({
                    username: 'test',
                    password: '$2a$10$99DNd9.h4ebeN1GFKMLjK.DapKMZjdSubJKuo44ONSGARCfMCnZb2' // bcrypt hash for 'test'
                });
            } else {
                return Promise.resolve(null);
            }
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should respond with a redirect to /admin/login on failed login', async () => {
        const response = await request(app)
            .post('/')
            .send({ username: 'test', password: 'wrongpassword' }) // replace with an invalid username or password
            .expect(302);

        expect(response.headers.location).toBe('/admin/login');
    });
});
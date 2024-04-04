const request = require('supertest');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
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

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should respond with a redirect on valid username and password', async () => {
        // Mock User.findOne to return a user object for a specific username
        User.findOne.mockResolvedValue({
            username: 'test',
            password: '$2a$10$99DNd9.h4ebeN1GFKMLjK.DapKMZjdSubJKuo44ONSGARCfMCnZb2' // bcrypt hash for 'test'
        });


        const response = await request(app)
            .post('/')
            .send({ username: 'test', password: 'test' })

        expect(response.statusCode).toEqual(302);
        expect(response.headers.location).toBe('/admin/');
    });

    it('should respond with a redirect to /admin/login on incorrect password', async () => {
        // Mock User.findOne to return a user object for a specific username
        User.findOne.mockResolvedValue({
            username: 'test',
            password: '$2a$10$99DNd9.h4ebeN1GFKMLjK.DapKMZjdSubJKuo44ONSGARCfMCnZb2' // bcrypt hash for 'test'
        });

        const response = await request(app)
            .post('/')
            .send({ username: 'test', password: 'wrongpassword' })


        expect(response.statusCode).toEqual(302);
        expect(response.headers.location).toBe('/admin/login');
    });

    it('should respond with a redirect to /admin/login on username not found in the database', async () => {
        // Mock User.findOne to return null for a specific username
        User.findOne.mockResolvedValue(null);



        const response = await request(app)
            .post('/')
            .send({ username: 'wrongusername', password: 'test' })


        expect(response.statusCode).toEqual(302);
        expect(response.headers.location).toBe('/admin/login');
    });

    it('should respond with a redirect to /admin/login on missing username', async () => {
        const response = await request(app)
            .post('/')
            .send({ password: 'test' }) // username is missing

        expect(response.statusCode).toEqual(302);
        expect(response.headers.location).toBe('/admin/login');
    });

    it('should respond with a redirect to /admin/login on missing password', async () => {
        const response = await request(app)
            .post('/')
            .send({ username: 'test' }) // password is missing

        expect(response.statusCode).toEqual(302);
        expect(response.headers.location).toBe('/admin/login');
    });
});

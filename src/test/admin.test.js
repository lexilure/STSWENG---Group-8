const request = require('supertest');
const express = require('express');
const adminRoutes = require('../routes/admin.js'); // Import your user routes

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON

// Manually create a session
app.use((req, res, next) => {
    req.session = { 
        user: {
            id: 'testId',
            username: 'test'
        },
        destroy: jest.fn(callback => callback())
    };
    next();
});

app.use('/admin/', adminRoutes); // Use your user routes

// Mock the res.status and res.send methods
const mockStatus = jest.fn().mockReturnThis();
const mockSend = jest.fn();
app.use((req, res, next) => {
    res.status = mockStatus;
    res.send = mockSend;
    next();
});

// Mock the sessionChecker middleware
jest.mock('../middleware/authmiddleware', () => (req, res, next) => next());

describe('GET /admin/logout', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('should respond with a redirect on successful logout', async () => {
        const response = await request(app)
            .get('/admin/logout')
            .expect(302);
    
        expect(response.headers.location).toBe('/admin/login');
    });
});

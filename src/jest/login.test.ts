const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/user.js'); // Import your user routes
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/login', userRoutes); // Use your user routes

jest.mock('bcryptjs'); // Mock bcrypt

jest.mock('../../src/models/user.js'); // Mock the User model
  
describe('Login Functionality', () => {
  it('should successfully login a user with correct credentials', async () => {
    // Mock User.findOne to simulate an existing user
    User.findOne = jest.fn().mockResolvedValue({ _id: '123', username: 'testuser', password: await bcrypt.hash('password123', 10) });

    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(302); // Expecting a redirect
    expect(res.headers.location).toBe('/admin/'); // Redirected to admin page
    expect(res.headers['set-cookie']).toBeDefined(); // Expecting a session cookie to be set
  });

  it('should reject login with incorrect password', async () => {
    // Mock User.findOne to simulate an existing user
    User.findOne = jest.fn().mockResolvedValue({ _id: '123', username: 'testuser', password: await bcrypt.hash('password123', 10) });

    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(res.statusCode).toBe(401); // Expecting unauthorized status code
    expect(res.headers.location).toBe('/admin/'); // Redirected to admin page
    expect(res.text).toBe('Incorrect Username.'); // Expecting error message
  });

  it('should reject login with non-existing username', async () => {
    // Mock User.findOne to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);

    const res = await request(app)
      .post('/admin/login')
      .send({ username: 'nonexistinguser', password: 'password123' });

    expect(res.statusCode).toBe(409); // Expecting conflict status code
    expect(res.headers.location).toBe('/admin/'); // Redirected to admin page
    expect(res.text).toBe('Username does not exist in the database.'); // Expecting error message
  });
});
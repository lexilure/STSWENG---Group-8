const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/user.js'); // Import your user routes

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/users', userRoutes); // Use your user routes

jest.mock('../../src/models/user.js'); // Mock the User model
const User = require('../../src/models/user.js');

jest.mock('bcryptjs'); // Mock bcrypt
const bcrypt = require('bcryptjs');

describe('POST /add', () => {
  it('should add a new user when valid username and password are provided', async () => {
    // Mock the User.findOne method to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);

    // Mock the bcrypt methods
    bcrypt.genSaltSync = jest.fn().mockReturnValue('salt');
    bcrypt.hashSync = jest.fn().mockReturnValue('hashedPassword');

    // Mock the User.save method to simulate successful save
    const mockSave = jest.fn().mockResolvedValue(true);
    User.prototype.save = mockSave;

    // Make a POST request to the /add endpoint
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    // Assertions
    expect(res.status).toBe(302); // Assuming a successful redirect after adding a user
    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
    expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
    expect(bcrypt.hashSync).toHaveBeenCalledWith('testpassword', 'salt');
    expect(mockSave).toHaveBeenCalled();
  });
});
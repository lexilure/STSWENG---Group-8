const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/user.js'); // Import your user routes

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/users', userRoutes); // Use your user routes

// Mock the res.status and res.send methods
const mockStatus = jest.fn().mockReturnThis();
const mockSend = jest.fn();
app.use((req, res, next) => {
  res.status = mockStatus;
  res.send = mockSend;
  next();
});

jest.mock('../../src/models/user.js'); // Mock the User model
const User = require('../../src/models/User.js');

jest.mock('bcryptjs'); // Mock bcrypt
const bcrypt = require('bcryptjs');



describe('POST /add', () => {
  // Positive Paths for testing Create functionality for user.js
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

  it('should hash the password before saving the user', async () => {
    // Mock the User.findOne method to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Mock the bcrypt methods
    const salt = 'salt';
    const hashedPassword = 'hashedPassword';
    bcrypt.genSaltSync = jest.fn().mockReturnValue(salt);
    bcrypt.hashSync = jest.fn().mockImplementation((password, salt) => {
      // Set the password property of the newUser object
      User.prototype.password = hashedPassword;
      return hashedPassword;
    });
  
    // Mock the User.save method to simulate successful save
    const mockSave = jest.fn().mockImplementation(function() {
      return this;
    });
    User.prototype.save = mockSave;
  
    // Make a POST request to the /add endpoint
    const password = 'testpassword';
    await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: password
      });
  
    // Assertions
    const genSaltCallIndex = bcrypt.genSaltSync.mock.invocationCallOrder[0];
    const hashSyncCallIndex = bcrypt.hashSync.mock.invocationCallOrder[0];
    expect(genSaltCallIndex).toBeLessThan(hashSyncCallIndex);
    expect(bcrypt.hashSync).toHaveBeenCalledWith(password, salt);
    expect(mockSave).toHaveBeenCalled();
    const newUser = mockSave.mock.instances[0];
    expect(newUser.password).toBe(hashedPassword);
    expect(newUser.password).not.toBe(password);
  });

  // Edge Cases
  it('should handle requests where the username already exists', async () => {
    // Mock the User.findOne method to simulate an existing user
    User.findOne = jest.fn().mockResolvedValue({ username: 'existinguser', password: 'hashedPassword' });
  
    // Make a POST request to the /add endpoint with an existing username
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'existinguser',
        password: 'testpassword'
      });
  
    // Assertions
    expect(res.status).toBe(302); // Route redirects back to the add form
  });

  it('should handle errors thrown by User.findOne()', async () => {
    // Mock the User.findOne method to simulate an error
    const mockError = new Error('Test error');
    User.findOne = jest.fn().mockRejectedValue(mockError);
  
    // Make a POST request to the /add endpoint
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
  
    // Assertions
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error registering the user.');
  });

  it('should handle errors thrown by newUser.save()', async () => {
    // Mock the User.findOne method to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Mock the bcrypt methods
    bcrypt.genSaltSync = jest.fn().mockReturnValue('salt');
    bcrypt.hashSync = jest.fn().mockReturnValue('hashedPassword');
  
    // Mock the User.save method to simulate an error
    const mockError = new Error('Test error');
    const mockSave = jest.fn().mockRejectedValue(mockError);
    User.prototype.save = mockSave;
  
    // Make a POST request to the /add endpoint
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
  
    // Assertions
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error registering the user.');
  });
  it('should handle errors thrown by bcrypt.genSaltSync()', async () => {
    // Mock the User.findOne method to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Mock the bcrypt.genSaltSync method to simulate an error
    const mockError = new Error('Test error');
    bcrypt.genSaltSync = jest.fn().mockImplementation(() => { throw mockError; });
  
    // Make a POST request to the /add endpoint
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
  
    // Assertions
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error registering the user.');
  });

  it('should handle errors thrown by bcrypt.hashSync()', async () => {
    // Mock the User.findOne method to simulate no existing user
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Mock the bcrypt.genSaltSync method to simulate successful salt generation
    bcrypt.genSaltSync = jest.fn().mockReturnValue('salt');
  
    // Mock the bcrypt.hashSync method to simulate an error
    const mockError = new Error('Test error');
    bcrypt.hashSync = jest.fn().mockImplementation(() => { throw mockError; });
  
    // Make a POST request to the /add endpoint
    const res = await request(app)
      .post('/admin/users/add')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });
  
    // Assertions
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error registering the user.');
  });
});

describe('POST /delete/:id', () => {
  const userId = 'testUserId';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully delete a user', async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue({});

    const res = await request(app).post(`/admin/users/delete/${userId}`);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/admin/users/');
  });

  it('should handle case where the user is not found', async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const res = await request(app).post(`/admin/users/delete/${userId}`);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
    expect(res.status).toBe(404);
    expect(res.text).toBe('User not found');
  });

  it('should handle case where User.findByIdAndDelete() throws an error', async () => {
    User.findByIdAndDelete = jest.fn().mockRejectedValue(new Error());

    const res = await request(app).post(`/admin/users/delete/${userId}`);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
    expect(res.status).toBe(500);
    expect(res.text).toBe('Error deleting the user.');
  });

  it('should handle case where deletedUser is null', async () => {
    User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const res = await request(app).post(`/admin/users/delete/${userId}`);

    expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
    expect(res.status).toBe(404);
    expect(res.text).toBe('User not found');
  });
});


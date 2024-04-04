const request = require('supertest');
const express = require('express');
const propertyRoutes = require('../routes/property.js'); // Import your property routes

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/properties', propertyRoutes); // Use your property routes

// Mock the res.status and res.send methods
const mockStatus = jest.fn().mockReturnThis();
const mockSend = jest.fn();

app.use((req, res, next) => {
  res.status = mockStatus;
  res.send = mockSend;
  next();
});

jest.mock('../models/Property.js'); // Mock the Property model
const Property = require('../../src/models/Property.js');

describe('POST /add', () => {
  // Positive Test Case 1
  it('should create a new property with all required fields and a valid image file', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  // Positive Test Case 2
  it('should create a new property with a unique name', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Unique Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  // Negative Test Case 1
  it('should fail to create a new property when propertyName is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });


  // Negative Test Case 2
  it('should fail to create a new property when propertyArchipelago is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });


  // Negative Test Case 3
  it('should fail to create a new property when propertyAddress is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 4
  it('should fail to create a new property when propertyPrice is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 5
  it('should fail to create a new property when propertyPrice is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 6
  it('should fail to create a new property when propertyStatus is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 7
  it('should fail to create a new property when lotSize is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 8
  it('should fail to create a new property when floorSize is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 9
  it('should fail to create a new property when numFloors is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 10
  it('should fail to create a new property when numRooms is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 11
  it('should fail to create a new property when additionalfeatures is missing', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 12
  it('should fail to create a new property without an image file', async () => {
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

  // Negative Test Case 13
  it('should fail to create a new property when the property name already exists', async () => {
    // First, mock the findOne function to simulate a property with the same name already exists
    Property.findOne.mockResolvedValue(true);

    // Then, try to create a property with the same name
    const res = await request(app)
      .post('/admin/properties/add')
      .field('propertyName', 'Test Property')
      .field('propertyArchipelago', 'Test Archipelago')
      .field('propertyAddress', 'Test Address')
      .field('propertyPrice', '1000000')
      .field('propertyStatus', 'Available')
      .field('lotSize', '100')
      .field('floorSize', '100')
      .field('numFloors', '2')
      .field('numRooms', '4')
      .field('additionalFeatures', 'Test Features')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/add');
  });

});

describe('POST /edit/:id', () => {
  it('should update a property with updated propertyName', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyName: 'New Property Name' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated propertyArchipelago', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyArchipelago: 'New Archipelago' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated propertyAddress', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyAddress: 'New Property Address' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated propertyPrice', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyPrice: '100000000' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated propertyStatus', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyStatus: 'New Property Status' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated lotSize', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { lotSize: '1000' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated floorSize', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { floorSize: '1000' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated numFloors', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { numFloors: '3' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated numRooms', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { numFloors: '5' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property with updated additionalFeatures', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { additionalFeatures: 'New Additional Featues' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should update a property image with valid data', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockResolvedValue(true),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const res = await request(app)
      .post('/admin/properties/edit/validPropertyId')
      .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should return 404 if property ID is invalid', async () => {
    Property.findById = jest.fn().mockResolvedValue(null);

    const mockReq = {
      params: { id: 'invalidPropertyId' },
      body: { propertyName: 'New Property Name' },
    };

    const res = await request(app).post('/admin/properties/edit/invalidPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('invalidPropertyId');
    expect(res.statusCode).toEqual(404);
  });

  it('should return 500 if property name or address already exists', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
      save: jest.fn().mockRejectedValue(new Error('duplicate key error')),
    };
    Property.findById = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
      body: { propertyName: 'Existing Property Name' },
    };

    const res = await request(app).post('/admin/properties/edit/validPropertyId').send(mockReq.body);

    expect(Property.findById).toHaveBeenCalledWith('validPropertyId');
    expect(mockProperty.save).toHaveBeenCalled();
    expect(res.statusCode).toEqual(500);
  });
});

describe('POST /delete/:id', () => {
  it('should delete a property with valid ID', async () => {
    const mockProperty = {
      _id: 'validPropertyId',
    };
    Property.findByIdAndDelete = jest.fn().mockResolvedValue(mockProperty);

    const mockReq = {
      params: { id: 'validPropertyId' },
    };

    const res = await request(app).post('/admin/properties/delete/validPropertyId').send(mockReq.body);

    expect(Property.findByIdAndDelete).toHaveBeenCalledWith('validPropertyId');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/admin/properties/');
  });

  it('should return 404 if property ID is invalid', async () => {
    Property.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const mockReq = {
      params: { id: 'invalidPropertyId' },
    };

    const res = await request(app).post('/admin/properties/delete/invalidPropertyId').send(mockReq.body);

    expect(Property.findByIdAndDelete).toHaveBeenCalledWith('invalidPropertyId');
    expect(res.statusCode).toEqual(404);
  });

  it('should return 500 if there is a database error', async () => {
    Property.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('database error'));

    const mockReq = {
      params: { id: 'validPropertyId' },
    };

    const res = await request(app).post('/admin/properties/delete/validPropertyId').send(mockReq.body);

    expect(Property.findByIdAndDelete).toHaveBeenCalledWith('validPropertyId');
    expect(res.statusCode).toEqual(500);
  });

  test('should return 404 if property is already deleted', async () => {
    Property.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const mockReq = {
        params: { id: 'alreadyDeletedPropertyId' },
    };

    const res = await request(app).post('/admin/properties/delete/alreadyDeletedPropertyId').send(mockReq.body);

    expect(Property.findByIdAndDelete).toHaveBeenCalledWith('alreadyDeletedPropertyId');
    expect(res.statusCode).toEqual(404);
});


});
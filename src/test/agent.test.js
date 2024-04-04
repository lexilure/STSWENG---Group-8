const request = require('supertest');
const express = require('express');
const agentRoutes = require('../routes/agent.js'); // Import your agent routes

// Create a test instance of your app
const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/agents', agentRoutes); // Use your agent routes

// Mock the res.status and res.send methods
const mockStatus = jest.fn().mockReturnThis();
const mockSend = jest.fn();

app.use((req, res, next) => {
    res.status = mockStatus;
    res.send = mockSend;
    next();
});

jest.mock('../models/Agent.js'); // Mock the agent model
const Agent = require('../../src/models/Agent.js');

describe('POST /add', () => {
    it('should create a new agent with all required fields and a valid image file', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should create a new agent with a unique name', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Unique Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should fail to create a new agent when agentName is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentEmail is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentEducation is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentFB is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentX is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentInstagram is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when agentLinkedIn is missing', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent without an image file', async () => {
        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

    it('should fail to create a new agent when the agent name already exists', async () => {

        Agent.findOne.mockResolvedValue(true);

        const res = await request(app)
            .post('/admin/agents/add')
            .field('agentName', 'Test Name')
            .field('agentEmail', 'Test Email')
            .field('agentEducation', 'Test Education')
            .field('agentFB', 'Test FB')
            .field('agentX', 'Test X')
            .field('agentInstagram', 'Test Instagram')
            .field('agentLinkedIn', 'Test LinkedIn')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/add');
    });

});

describe('POST /edit/:id', () => {
    it('should update an agent with updated agentName', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentName: 'New Agent Name' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentEmail', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentEmail: 'New Agent Email' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentEducation', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentEducation: 'New Agent Education' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentFB', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentFB: 'New Agent FB' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentX', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentX: 'New Agent X' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentInstagram', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentInstagram: 'New Agent Email' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should update an agent with updated agentLinkedIn', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentLinkedIn: 'New Agent Email' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    test('should update a agent image with valid data', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockResolvedValue(true),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const res = await request(app)
            .post('/admin/agents/edit/validAgentId')
            .attach('imageUpload', Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', 'base64'), 'image.png');

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/admin/agents/');
    });

    it('should return 404 if agent ID is invalid', async () => {
        Agent.findById = jest.fn().mockResolvedValue(null);

        const mockReq = {
            params: { id: 'invalidAgentId' },
            body: { agentName: 'New Agent Name' },
        };

        const res = await request(app).post('/admin/agents/edit/invalidAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('invalidAgentId');
        expect(res.statusCode).toEqual(404);
    });

    it('should return 500 if agent name or address already exists', async () => {
        const mockAgent = {
            _id: 'validAgentId',
            save: jest.fn().mockRejectedValue(new Error('duplicate key error')),
        };
        Agent.findById = jest.fn().mockResolvedValue(mockAgent);

        const mockReq = {
            params: { id: 'validAgentId' },
            body: { agentName: 'Existing Agent Name' },
        };

        const res = await request(app).post('/admin/agents/edit/validAgentId').send(mockReq.body);

        expect(Agent.findById).toHaveBeenCalledWith('validAgentId');
        expect(mockAgent.save).toHaveBeenCalled();
        expect(res.statusCode).toEqual(500);
    });

    describe('POST /delete/:id', () => {
        it('should delete a agent with valid ID', async () => {
            const mockagent = {
                _id: 'validAgentId',
            };
            Agent.findByIdAndDelete = jest.fn().mockResolvedValue(mockagent);

            const mockReq = {
                params: { id: 'validAgentId' },
            };

            const res = await request(app).post('/admin/agents/delete/validAgentId').send(mockReq.body);

            expect(Agent.findByIdAndDelete).toHaveBeenCalledWith('validAgentId');
            expect(res.statusCode).toEqual(302);
            expect(res.headers.location).toEqual('/admin/agents/');
        });

        it('should return 404 if agent ID is invalid', async () => {
            Agent.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            const mockReq = {
                params: { id: 'invalidAgentId' },
            };

            const res = await request(app).post('/admin/agents/delete/invalidAgentId').send(mockReq.body);

            expect(Agent.findByIdAndDelete).toHaveBeenCalledWith('invalidAgentId');
            expect(res.statusCode).toEqual(404);
        });

        it('should return 500 if there is a database error', async () => {
            Agent.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('database error'));

            const mockReq = {
                params: { id: 'validAgentId' },
            };

            const res = await request(app).post('/admin/agents/delete/validAgentId').send(mockReq.body);

            expect(Agent.findByIdAndDelete).toHaveBeenCalledWith('validAgentId');
            expect(res.statusCode).toEqual(500);
        });

        test('should return 404 if agent is already deleted', async () => {
            Agent.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            const mockReq = {
                params: { id: 'alreadyDeletedagentId' },
            };

            const res = await request(app).post('/admin/agents/delete/alreadyDeletedagentId').send(mockReq.body);

            expect(Agent.findByIdAndDelete).toHaveBeenCalledWith('alreadyDeletedagentId');
            expect(res.statusCode).toEqual(404);
        });
    });
});
const request = require('supertest');
const express = require('express');
const agentRoutes = require('../routes/agent.js');
const Agent = require('../models/Agent.js');

const app = express();
app.use(express.json()); // Ensure your app uses JSON
app.use('/admin/agents', agentRoutes); // Use your agent routes

jest.mock('../models/Agent.js'); // Mock the Agent model

describe('Agent Routes', () => {
  it('should fetch agents list successfully', async () => {
    // Mock Agent.find to simulate fetching agents
    const mockAgents = [{ name: 'Agent 1', email: 'agent1@example.com' }, { name: 'Agent 2', email: 'agent2@example.com' }];
    Agent.find = jest.fn().mockResolvedValue(mockAgents);

    const res = await request(app)
      .get('/admin/agents/')
      .expect(200);

    expect(res.text).toContain('Agent 1'); // Expecting response to contain agent names
    expect(res.text).toContain('Agent 2');
  });

  it('should add a new agent successfully', async () => {
    // Mock Agent.findOne to simulate no existing agent
    Agent.findOne = jest.fn().mockResolvedValue(null);

    // Mock Agent.save to simulate successful save
    const mockSave = jest.fn().mockResolvedValue(true);
    Agent.prototype.save = mockSave;

    const res = await request(app)
      .post('/admin/agents/add')
      .send({
        agentName: 'New Agent',
        agentEmail: 'newagent@example.com',
        agentEducation: 'Education',
        agentFB: 'Facebook',
        agentX: 'X',
        agentInstagram: 'Instagram',
        agentLinkedIn: 'LinkedIn'
      })
      .expect(302);

    expect(mockSave).toHaveBeenCalled(); // Expecting save method to be called
  });

  // Add more test cases for edit and delete operations similarly
});

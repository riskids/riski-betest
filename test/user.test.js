const request = require('supertest');
const app = require('../server');
const User = require('../src/models/User');
jest.mock('../src/models/User'); // Mock the User model

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { userName: 'John Doe', accountNumber: '123456', emailAddress: 'john@example.com', identityNumber: '987654321' };
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(userData),
      }));

      const response = await request(app)
        .post('/users')
        .send(userData)
        .expect(201);

      expect(response.body).toEqual(userData);
    });

    it('should return 400 if user creation fails', async () => {
      User.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Failed to create user')),
      }));

      const response = await request(app)
        .post('/users')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('message', 'Failed to create user');
    });
  });

  describe('getUserByAccountNumber', () => {
    it('should return a user by account number', async () => {
      const userData = { userName: 'John Doe', accountNumber: '123456' };
      User.findOne.mockResolvedValue(userData);

      const response = await request(app)
        .get('/users/account/123456')
        .expect(200);

      expect(response.body).toEqual(userData);
    });

    it('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      await request(app)
        .get('/users/account/123456')
        .expect(404);
    });
  });

  describe('getUserByIdentityNumber', () => {
    it('should return a user by identity number', async () => {
      const userData = { userName: 'John Doe', identityNumber: '987654321' };
      User.findOne.mockResolvedValue(userData);

      const response = await request(app)
        .get('/users/identity/987654321')
        .expect(200);

      expect(response.body).toEqual(userData);
    });

    it('should return 404 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      await request(app)
        .get('/users/identity/987654321')
        .expect(404);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userData = { userName: 'John Doe' };
      User.findByIdAndUpdate.mockResolvedValue(userData);

      const response = await request(app)
        .patch('/users/1')
        .send(userData)
        .expect(200);

      expect(response.body).toEqual(userData);
    });

    it('should return 404 if user not found', async () => {
      User.findByIdAndUpdate.mockResolvedValue(null);

      await request(app)
        .patch('/users/1')
        .send({ userName: 'John Doe' })
        .expect(404);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userData = { userName: 'John Doe' };
      User.findByIdAndDelete.mockResolvedValue(userData);

      const response = await request(app)
        .delete('/users/1')
        .expect(200);

      expect(response.body).toEqual(userData);
    });

    it('should return 404 if user not found', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      await request(app)
        .delete('/users/1')
        .expect(404);
    });
  });
});

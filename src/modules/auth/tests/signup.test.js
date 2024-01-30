// Import required modules
import request from 'supertest';
import { describe, test } from 'jest';
import app from '../../../server';
// Begin writing tests
describe('POST /signup', () => {
  test('responds with json', async () => {
    const newUser = {
      username: 'testUser',
      profilePic: 'testPic',
      email: 'testEmail@test.com',
      password: 'testPassword'
    };
    await request(app).post('/signup').send(newUser).expect('Content-Type', /json/).expect(200);
  });

  test('responds with 400 for missing fields', async () => {
    const newUser = {
      username: 'testUser',
      profilePic: 'testPic',
      email: 'testEmail@test.com'
    };
    await request(app).post('/signup').send(newUser).expect(400);
  });

  test('responds with 409 for existing user', async () => {
    const newUser = {
      username: 'testUser',
      profilePic: 'testPic',
      email: 'testEmail@test.com',
      password: 'testPassword'
    };
    await request(app).post('/signup').send(newUser).expect(200);
    await request(app).post('/signup').send(newUser).expect(409);
  });
});

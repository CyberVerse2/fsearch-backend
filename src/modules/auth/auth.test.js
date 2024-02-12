import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import request from 'supertest';
const baseUrl = 'http:/localhost:8080/api/v1';

test('SignUp a user', async () => {
  const newUser = {
    username: 'Einstein',
    profilePic: 'http://www.google.com',
    email: 'pythongod00@gmail.com',
    password: 'Chinaza@1.0',
    isTermsAccepted: true
  };
  const response = await request(baseUrl).post('/auth/signup').send(newUser);
  console.log(response);
  expect(response.statusCode).toBe(201);
});

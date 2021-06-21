const request = require('supertest');
const axios = require('axios');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { CREATED, FORBBIDEN_ERROR, VALIDATION_ERROR } = require('../constants/constants');

const ENDPOINT = '/weets';
axios.get = jest.fn();

let response = {};
let userData = {};
let weetData = {};
let responseToken = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    await factoryByModel('Weet');

    userData = await factory.build('User', { email: 'asasas@wolox.com.ar' });
    weetData = await factory.build('Weet');
  });

  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send({
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: 'ABC123ab'
      });

    response = await request(app)
      .post('/users/sessions')
      .send({
        email: userData.dataValues.email,
        password: 'ABC123ab'
      });

    responseToken = response.body.token;
  });

  describe('Should be successful', () => {
    beforeEach(async () => {
      axios.get.mockImplementation(() => Promise.resolve({ data: { joke: weetData.dataValues.content } }));
      response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseToken}`);
    });

    test('Status code should be 201', () => {
      expect(response.statusCode).toEqual(CREATED);
    });
    test('Should the have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'content', 'userId', 'createdAt', 'updatedAt');
    });
  });

  describe('Should handle error when the external api responds with error', () => {
    beforeEach(async () => {
      axios.get.mockImplementation(() => Promise.reject(new Error('Error')));
      response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseToken}`);
    });

    test('Status code should be 422', () => {
      expect(response.statusCode).toEqual(VALIDATION_ERROR);
    });
    test('Should the have the following properties', () => {
      expect(response.body).toHaveProperty('internal_code');
    });

    describe('Should handle error when the token is not sent', () => {
      beforeEach(async () => {
        response = await request(app).post(ENDPOINT);
      });

      test('Status code should be 403', () => {
        expect(response.statusCode).toBe(FORBBIDEN_ERROR);
      });

      test('should return json body in response', () => {
        expect(response.body).toStrictEqual({ internal_code: 'forbbiden_error', message: 'Invalid' });
      });
    });
  });
});

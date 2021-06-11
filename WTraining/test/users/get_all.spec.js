const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { OK, FORBBIDEN_ERROR, UNAUTHORIZED_ERROR, PAGE, LIMIT, ORDER } = require('../constants/constants');

const ENDPOINT = '/users';

let response = {};
let userData = {};
let responseToken = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    userData = await factory.build('User', { email: 'asasas@wolox.com.ar' });
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
    console.log(responseToken);
  });

  describe('Should be successful', () => {
    beforeEach(async () => {
      response = await request(app)
        .get(`${ENDPOINT}?page=${PAGE}&limit=${LIMIT}&order_by=${ORDER}`)
        .set('Authorization', `Bearer ${responseToken}`);
    });

    test('Status code should be 200', () => {
      expect(response.statusCode).toEqual(OK);
    });
    test('Should the  have the following properties', () => {
      expect(response.body).toHaveProperty('qty_page', 'total', 'users');
    });
  });

  describe('Should handle the error when the token has no Bearer', () => {
    beforeEach(async () => {
      response = await request(app)
        .get(`${ENDPOINT}?page=${PAGE}&limit=${LIMIT}&order_by=${ORDER}`)
        .set('Authorization', `${responseToken}`);
    });

    test('Status code should be 403', () => {
      expect(response.statusCode).toEqual(FORBBIDEN_ERROR);
    });
    test('Should the  have the following properties', () => {
      expect(response.body).toStrictEqual({ internal_code: 'forbbiden_error', message: 'Invalid' });
    });
  });
  describe('Should handle the error when the token is malformed', () => {
    beforeEach(async () => {
      response = await request(app)
        .get(`${ENDPOINT}?page=${PAGE}&limit=${LIMIT}&order_by=${ORDER}`)
        .set('Authorization', 'Bearer eyJ0eXA.iOiJKV1QiLCsJhbG.ciOiJIUzI1NiJ9');
    });

    test('Status code should be 403', () => {
      expect(response.statusCode).toEqual(UNAUTHORIZED_ERROR);
    });
    test('Should the  have the following properties', () => {
      expect(response.body).toStrictEqual({ internal_code: 'unauthorized_error', message: 'Unauthorized' });
    });
  });
});

const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { OK } = require('../constants/constants');
const { createUser } = require('../../app/services/user');

const ENDPOINT = '/users/sessions';

let response = {};
let userData = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    userData = await factory.build('User', { email: 'asasas32@wolox.com.ar' });
  });

  beforeEach(async () => {
    await createUser({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: 'ABC123ab'
    });
  });

  describe('Should be successful', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({
          email: userData.email,
          password: 'ABC123ab'
        });
    });

    test('Status code should be 200', () => {
      expect(response.statusCode).toEqual(OK);
    });
    test('Should the  have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'name', 'lastName', 'email', 'createdAt', 'updatedAt');
    });
  });

  /*  describe('Should handle error when no parameters are sent', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({});
    });

    test('Status code should be 422', () => {
      expect(response.statusCode).toBe(VALIDATION_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        internal_code: 'validation_error',
        message: [
          {
            location: 'request',
            msg: 'Password should not be empty',
            param: 'password'
          },
          {
            location: 'request',
            msg: 'Email should not be empty',
            param: 'email'
          }
        ]
      });
    });
  });

  describe('Should handle the error when the password is wrong', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({
          email: userData.email,
          password: 'sdfefwd4'
        });
    });

    test('Status code should be 409', () => {
      expect(response.statusCode).toBe(UNAUTHORIZED_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        internal_code: 'unauthorized_error',
        message: 'wrong user or password'
      });
    });
  });

  describe('Should handle the error when the email is wrong', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({
          email: 'asasas.adfaf@wolox.com.ar',
          password: 'ABC123ab'
        });
    });

    test('Status code should be 401', () => {
      expect(response.statusCode).toBe(UNAUTHORIZED_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        internal_code: 'unauthorized_error',
        message: 'wrong user or password'
      });
    });
  }); */
});

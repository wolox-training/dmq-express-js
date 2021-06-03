const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { USER_ERROR, DATABASE_ERROR, INTERNAL_ERROR, CREATED } = require('../constants/constants');

const ENDPOINT = '/users';

let response = {};
let userData = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async done => {
    await factoryByModel('User');
    userData = await factory.build('User', { password: 'ABC123ab', email: 'asasas@wolox.com.ar' });
    done();
  });

  describe('Should handle error when password does not meet requirements', () => {
    beforeEach(async done => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: 'erre.'
      };

      response = await request(app)
        .post(ENDPOINT)
        .send(user);

      done();
    });

    test('Status code should be 503', () => {
      expect(response.statusCode).toBe(DATABASE_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        message: 'The password must be alphanumeric, with a minimum length of 8 characters.',
        internal_code: 'database_error'
      });
    });
  });

  describe('Should be expired and close some quotes successful', () => {
    beforeEach(async () => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: userData.dataValues.password
      };

      response = await request(app)
        .post(ENDPOINT)
        .send(user);
    });

    test('Status code should be 201', () => {
      expect(response.statusCode).toEqual(CREATED);
    });
    test('Should the object have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'name', 'lastName', 'email', 'createdAt', 'updatedAt');
    });
  });

  describe('Should handle the error when the mail is already in use', () => {
    beforeEach(async done => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: userData.dataValues.password
      };

      await request(app)
        .post(ENDPOINT)
        .send(user);

      response = await request(app)
        .post(ENDPOINT)
        .send(user);

      done();
    });

    test('Status code should be 500', () => {
      expect(response.statusCode).toBe(INTERNAL_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        message: 'Email is already in use.'
      });
    });
  });

  describe('Should handle error when no parameters are sent', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({});
    });

    test('Status code should be 400', () => {
      expect(response.statusCode).toBe(USER_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        message: 'The body cannot be empty',
        internal_code: 'user_error'
      });
    });
  });
});

const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { CREATED, VALIDATION_ERROR, FORBBIDEN_ERROR } = require('../constants/constants');
const { ADMIN } = require('../../app/constants/constants');
const { createUser } = require('../../app/services/user');

const ENDPOINT = '/admin/users';

let response = {};
let userData = {};
let responseTokenAdmin = {};
let responseTokenRegular = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    userData = await factory.build('User', { email: 'asasas@wolox.com.ar' });
  });

  beforeEach(async () => {
    await createUser({
      name: userData.dataValues.name,
      lastName: userData.dataValues.lastName,
      email: userData.dataValues.email,
      role: ADMIN,
      password: 'ABC123ab'
    });

    await createUser({
      name: userData.dataValues.name,
      lastName: userData.dataValues.lastName,
      email: 'asasas12@wolox.com.ar',
      password: 'ABC123ab'
    });

    const responseAdmin = await request(app)
      .post('/users/sessions')
      .send({
        email: userData.dataValues.email,
        password: 'ABC123ab'
      });

    responseTokenAdmin = responseAdmin.body.token;

    const responseRegular = await request(app)
      .post('/users/sessions')
      .send({
        email: 'asasas12@wolox.com.ar',
        password: 'ABC123ab'
      });

    responseTokenRegular = responseRegular.body.token;
  });

  describe('Should be successful', () => {
    beforeEach(async () => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        role: ADMIN,
        password: 'ABC123ab'
      };

      response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseTokenAdmin}`)
        .send(user);
    });

    test('Status code should be 201', () => {
      expect(response.statusCode).toEqual(CREATED);
    });
    test('Should the have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'name', 'lastName', 'email', 'createdAt', 'updatedAt');
    });
  });

  describe('Should handle error when password does not meet requirements', () => {
    beforeEach(async done => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: 'err3e'
      };

      response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseTokenAdmin}`)
        .send(user);

      done();
    });

    test('Status code should be 422', () => {
      expect(response.statusCode).toBe(VALIDATION_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        message: [
          {
            location: 'request',
            msg: 'Password should be at least 8 chars long',
            param: 'password'
          }
        ],
        internal_code: 'validation_error'
      });
    });
  });

  describe('Should handle the error when the role is regular', () => {
    beforeEach(async () => {
      const user = {
        name: userData.dataValues.name,
        last_name: userData.dataValues.lastName,
        email: userData.dataValues.email,
        password: 'ABC123ab'
      };

      await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseTokenRegular}`)
        .send(user);

      response = await request(app)
        .post(ENDPOINT)
        .send(user);
    });

    test('Status code should be 403', () => {
      expect(response.statusCode).toBe(FORBBIDEN_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        internal_code: 'forbbiden_error',
        message: 'Invalid'
      });
    });
  });
});

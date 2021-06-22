const request = require('supertest');
const sgMail = require('@sendgrid/mail');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { VALIDATION_ERROR, CREATED, CONFLICT_ERROR } = require('../constants/constants');

const ENDPOINT = '/users';

sgMail.setApiKey = jest.fn();
sgMail.send = jest.fn();

let response = {};
let userData = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    userData = await factory.build('User', { email: 'asasas@wolox.com.ar' });
    sgMail.send.mockImplementation(() => Promise.resolve());
    sgMail.setApiKey.mockImplementation(() => Promise.resolve());
  });

  describe('Should handle error when password does not meet requirements', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({
          name: userData.dataValues.name,
          last_name: userData.dataValues.lastName,
          email: userData.dataValues.email,
          password: 'err3e'
        });
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

  describe('Should be successful', () => {
    beforeEach(async () => {
      response = await request(app)
        .post(ENDPOINT)
        .send({
          name: userData.dataValues.name,
          last_name: userData.dataValues.lastName,
          email: userData.dataValues.email,
          password: 'ABC123ab'
        });
    });

    test('Status code should be 201', () => {
      expect(response.statusCode).toEqual(CREATED);
    });
    test('Should the have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'name', 'lastName', 'email', 'createdAt', 'updatedAt');
    });
  });

  describe('Should handle the error when the mail is already in use', () => {
    beforeEach(async () => {
      await request(app)
        .post(ENDPOINT)
        .send({
          name: userData.dataValues.name,
          last_name: userData.dataValues.lastName,
          email: userData.dataValues.email,
          password: 'ABC123ab'
        });

      response = await request(app)
        .post(ENDPOINT)
        .send({
          name: userData.dataValues.name,
          last_name: userData.dataValues.lastName,
          email: userData.dataValues.email,
          password: 'ABC123ab'
        });
    });

    test('Status code should be 409', () => {
      expect(response.statusCode).toBe(CONFLICT_ERROR);
    });

    test('should return json body in response', () => {
      expect(response.body).toStrictEqual({
        internal_code: 'conflict_error',
        message: 'Email is already in use'
      });
    });
  });

  describe('Should handle error when no parameters are sent', () => {
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
            msg: 'Name should not be empty',
            param: 'name'
          },
          {
            location: 'request',
            msg: 'Last name should not be empty',
            param: 'last_name'
          },
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
});

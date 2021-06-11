const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { OK, PAGE, LIMIT, ORDER } = require('../constants/constants');

const ENDPOINT = '/users';

let response = {};
let userData = {};

describe(`POST ${ENDPOINT}`, () => {
  beforeAll(async () => {
    await factoryByModel('User');
    userData = await factory.build('User', { email: 'asasas@wolox.com.ar' });
  });

  beforeEach(async () => {
    const user = {
      name: userData.dataValues.name,
      last_name: userData.dataValues.lastName,
      email: userData.dataValues.email,
      password: 'ABC123ab'
    };

    response = await request(app)
      .post('/users')
      .send(user);
  });

  describe('Should be successful', () => {
    beforeEach(async () => {
      response = await request(app).get(`${ENDPOINT}?page=${PAGE}&limit=${LIMIT}&order_by=${ORDER}`);
    });

    test('Status code should be 200', () => {
      expect(response.statusCode).toEqual(OK);
    });
    test('Should the  have the following properties', () => {
      expect(response.body).toHaveProperty('qty_page', 'total', 'users');
    });
  });
});

const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../../app');
const { factoryByModel } = require('../factory/factory_by_models');
const { SCORE, WRONG_SCORE, OK, VALIDATION_ERROR, DATABASE_ERROR } = require('../constants/constants');
const { createUser } = require('../../app/services/user');
const { createWeet } = require('../../app/services/weet');
const { RatingWeet } = require('../../app/models');

let response = {};
let userData = {};
let weetData = {};
let responseToken = {};
let ENDPOINT = '';

describe('POST /weets/:id/ratings', () => {
  beforeAll(async () => {
    await factoryByModel('User');
    await factoryByModel('Weet');

    userData = await factory.build('User', { email: 'asasas12@wolox.com.ar' });
    weetData = await factory.build('Weet');
  });

  beforeEach(async () => {
    const user = await createUser({
      name: userData.dataValues.name,
      lastName: userData.dataValues.lastName,
      email: userData.dataValues.email,
      password: 'ABC123ab'
    });

    const weet = await createWeet({
      content: weetData.dataValues.content.substr(0, 140),
      userId: user.id
    });

    ENDPOINT = `/weets/${weet.id}/ratings`;

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
      response = await request(app)
        .post(ENDPOINT)
        .set('Authorization', `Bearer ${responseToken}`)
        .send({ score: SCORE });
    });

    test('Status code should be 200', () => {
      expect(response.statusCode).toEqual(OK);
    });
    test('Should the have the following properties', () => {
      expect(response.body).toHaveProperty('id', 'ratingUserId', 'weetId', 'score', 'updatedAt', 'createdAt');
    });
  });
});

describe('Should handle error when score has a value different from 1 or -1', () => {
  beforeEach(async () => {
    response = await request(app)
      .post(ENDPOINT)
      .set('Authorization', `Bearer ${responseToken}`)
      .send({ score: WRONG_SCORE });
  });

  test('Status code should be 422', () => {
    expect(response.statusCode).toEqual(VALIDATION_ERROR);
  });
  test('Should the have the following properties', () => {
    expect(response.body).toHaveProperty('internal_code');
  });
});

describe('Should handle error when the database responds with error', () => {
  beforeEach(async () => {
    RatingWeet.findOne = jest.fn();
    RatingWeet.findOne.mockImplementation(() => Promise.reject(new Error('Error')));
    response = await request(app)
      .post(ENDPOINT)
      .set('Authorization', `Bearer ${responseToken}`)
      .send({ score: SCORE });
  });

  test('Status code should be 503', () => {
    expect(response.statusCode).toEqual(DATABASE_ERROR);
  });
  test('Should the have the following properties', () => {
    expect(response.body).toStrictEqual({ internal_code: 'database_error', message: 'Error' });
  });
});

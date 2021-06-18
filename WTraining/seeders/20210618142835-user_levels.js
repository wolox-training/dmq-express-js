'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('user_levels', [
      {
        level: 'Developer',
        min: 0,
        max: 5
      },
      {
        level: 'Lead',
        min: 5,
        max: 10
      },
      {
        level: 'TL',
        min: 10,
        max: 20
      },
      {
        level: 'EM',
        min: 20,
        max: 30
      },
      {
        level: 'HEAD',
        min: 30,
        max: 50
      },
      {
        level: 'CEO',
        min: 50,
        max: 999999999
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete('user_levels', null, {})
};

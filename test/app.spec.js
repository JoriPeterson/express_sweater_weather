var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate')
      shell.exec('npx sequelize db:seed:all')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });
});

describe('POST /api/v1/users', () => {
  it('User should post to db and api key returned', () => {
    request(app)
      .post('/users')
      .send('email=jori@gmail', 'password=password', 'passwordConfirmation=password')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.apiKey = user.apiKey;
        })
      .expect(201);
  });
});

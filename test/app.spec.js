var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
    });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all --env test')
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

describe('POST /api/v1/sessions', () => {
  it('Registered user gets api key returned', () => {
    request(app)
      .post('/sessions')
      .send('email=jori@gmail', 'password=password')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.apiKey = user.apiKey;
        })
      .expect(200);
  });
});

describe('GET /api/v1/forecast', () => {
  it('Registered user gets weather forecast', () => {
    request(app)
      .post('/sessions')
      .send('apiKey=f4b56cb7-7f0a-4d79-95a8-fc4eb292e90b')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body = weather;
        })
      .expect(200);
  });
});

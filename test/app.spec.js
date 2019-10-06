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
      .post('/api/v1/users')
      .send('email=jori@gmail', 'password=password', 'passwordConfirmation=password')
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.apiKey = user.apiKey;
        })
      .expect(201);
  });
});

// describe('POST /api/v1/sessions', () => {
//   test('Registered user gets api key returned', () => {
//     return request(app)
//       .post('/api/v1/sessions')
//       .send('email=jori@gmail', 'password=password')
//       .then(response => {
//         expect(res.body.apiKey == user.apiKey)
//         expect(response.status).toBe(200);
//       });
//   });
// });

describe('GET /api/v1/forecast', () => {
  test('Registered user gets weather forecast', () => {
    return request(app)
      .get('/api/v1/forecast?location=Denver,CO')
      .send({api_key: 'api_key=f4b56cb7-7f0a-4d79-95a8-fc4eb292e90b'})
      .then(response => {
        expect(response.body == weather)
        expect(response.status).toBe(200);
      })
  });
});

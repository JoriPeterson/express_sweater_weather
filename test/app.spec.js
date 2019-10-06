var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User
var location = require('../models').Location

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create --env test')
  });
  beforeEach(() => {
      shell.exec('npx sequelize db:migrate --env test')
      shell.exec('npx sequelize db:seed:all --env test')
      user.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
        apiKey: uuidv4()
      })
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
      .send({api_key: `api_key=${user.apiKey}`})
      .set('Accept', 'application/json')
      .then(response => {
        console.log(response.body.what)
        // expect(Object.keys(response.body[0])).toContain('title')
        expect(response.status).toBe(200);
      })
  });
});

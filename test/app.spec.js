var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('db', 'username', 'postgres', {dialect: 'postgres'});
const User = require('../models').User;
const Location = require('../models').Location;


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

describe('POST /api/v1/sessions', () => {
  test('Registered user gets api key returned', async () => {

    const jori = await User.create({
      email: 'jori@gmail.com',
      password: 'password',
      apiKey: "bc15b840-e582-11e9-9610-5f33da77ab8b",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    var myuser = await User.findOne({where: {email: 'jori@gmail.com'}})
    .then(user => {console.log("THEN!"+user.email)})
    .catch(err => {console.log("err:"+err)})

    console.log('DO I GET CALLED?'+myuser)

    User.findOne( {
      where: {
        email: "jori@gmail.com" }
    })
    .then (user => {
      return request(app)
        .post('/api/v1/sessions')
        .send('email=jori@gmail', 'password=password')
        .then(response => {
          expect(res.body.apiKey == user.apiKey)
          expect(response.status).toBe(200);
      });
    }).catch(error => console.log("hi"))
  });
});

describe('GET /api/v1/forecast', () => {
  test('Registered user gets weather forecast', async () => {

    console.log('step 0')
    const jori = await User.create({
      email: 'jori@gmail.com',
      password: 'password',
      apiKey: "bc15b840-e582-11e9-9610-5f33da77ab8b",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    let user = await User.findOne({where: {email: 'jori@gmail.com'}})
    // service = { api_key: user.apiKey };
    // .then(user => {console.log("THEN!"+user.email)})
    // .catch(err => {console.log("err:"+err)})

      // console.log('step 1'+myuser)
      return request(app)
        .get('/api/v1/forecast?location=Denver,CO')
        .send({api_key: "bc15b840-e582-11e9-9610-5f33da77ab8b"})
        .set('Accept', 'application/json')
        .then(response => {
          console.log('step 2' + response)
          expect(response.status).toBe(207);
          console.log(response.body)
          expect(response.body.currently).toBeDefined()
          // expect(Object.keys(response.body)).toContain('currently')

        })
    }
  )})

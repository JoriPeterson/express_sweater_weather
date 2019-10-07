## Express Sweater Weather

### Introduction

Express Sweater Weather is my first attempt at Node.js and Express. This application uses POST and GET requests to enable users to register with their email, then get an API key in order to access weather forecasts for their preferred locations.

Ideally, a user would be able to get make a favorites’ list, retrieve that list, and also be able to delete favorites from their list. This functionality has not been built out at this time.

### Project Board

[Click Here to see the Sweather_Weather Project Board](https://github.com/JoriPeterson/express_sweater_weather/projects/1)

### Initial Setup

* `$ git clone git@github.com:JoriPeterson/express_sweater_weather.git`
* `$ cd express_sweater_weather`
* `$ npm install`
* `$ npm install --save sequelize sequelize-cli pg`
* `$ npx sequelize db:create`
* Make sure node_modules are in your .gitignore.

### How to Use

First run `npm start` to get your local host up and running.
Test out the endpoints in Postman or the application of your choice

```.env
GOOGLE_API_KEY: <your Google Client ID>
DARKSKY_API_KEY: <your Google Client Secret>
```

Example requests:

```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}

POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```

Example response:

```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

And currently in progress, a user can enter their API key to receive a weather forecast:

`GET /api/v1/forecast?location=denver,co`

### Known Issues

At the moment, there is an issue with a nested fetch request in the `/routes/api/v1/forecast.js` file. This is what I am currently working my way through.

### Running Tests

Testing for express_sweater_weather is done through Jest.
Two tests are passing for User Creation and User Sessions.
The third test for Retrieving Forecasts is still in progress.

`npm install babel-jest supertest shelljs -D`
`nmp test`

### How to Contribute

If you'd like to contribute, fork and clone this repo, make your changes and submit a pull request. Tag me in it `@joripeterson` so I can merge you in!

### Core Contributors

So far, just me!
- [Jori Peterson](https://github.com/JoriPeterson)

### Tech Stack List

- This app is built in Express with Node.js
- Testing is done with Jest
- The database is PostgresQL, in conjunction with Sequelize
- This application uses the Google Geocoding API (for latitude and longitude), and the weather calls are made through DarkSky API

### Schema Design

In a future iteration, there would be a user_favorites join table with a user_id and a location_id.

![express_sweater_weather schema](/schema_diagram.png?raw=true "Sweather_Weather_Schema")

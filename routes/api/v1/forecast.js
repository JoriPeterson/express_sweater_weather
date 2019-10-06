var express = require('express');
var router = express.Router()
var fetch = require('node-fetch')
var dotenv = require('dotenv').config()
var user = require('../../../models').User
var location = require('../../../models').Location

router.get("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")
  user.findAll().then(users => res.status(401).send({what: "users"}))
  .catch(res.status(401).send({what: "no users"}))

  user.findOne({
    where: {
      apiKey: req.body.api_key
    }
  })
  .then(user => {

    location.findOne ({
      where: {
        location: req.query.location
      }
    })
    .then(location => {
      if (location === null) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(result => location = {location: req.query.location,
          lat: result['results'][0]['geometry']['location']['lat'],
          lng: result['results'][0]['geometry']['location']['lng']})

        Location.create(location)
      }
      return location
    })
    .then(user => {

      fetch(`https://api.darksky.net/forecast/${process.env.DarkSkyAPI}/${location.lat},${location.lng}?exclude=minutely`)
      .then(response => response.json())
      .then(result => console.log(result))
    })
    .catch(error => {
      res.status(401).send({what: "Some other problem"})
    })
  })
  .catch(error => {
    res.status(401).send({what: "Invalid API Key"})
  })
})

module.exports = router;

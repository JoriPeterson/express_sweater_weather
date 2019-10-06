var express = require('express');
var router = express.Router()
var fetch = require('node-fetch')
var dotenv = require('dotenv').config()
var location = require('../../../models').Location

router.get("/", function(req, res, next){
  let location;
  res.setHeader("Content-type", "application/json")
  // findOne where req.body.api_key exists
  // findOne (location)
  // no location
  // then
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then(result => location = {location: req.query.location,
                              lat: result['results'][0]['geometry']['location']['lat'],
                              lng: result['results'][0]['geometry']['location']['lng'])}
  Location.create(location)
  // fetch(DarkSkyAPI (location.lat, location.lng))

  // send parsed json - user story requirements

})

// async await... instead of .then if you don't store in database
module.exports = router;

var express = require('express');
var router = express.Router()
var User = require('../../../models').User
var Location = require('../../../models').Location
var fetch = require('node-fetch')
var dotenv = require('dotenv').config()

router.get("/", function(req, res, next){
  console.log("hit user")
  res.setHeader("Content-type", "application/json")

  // User.findOne({
  //   where: {
  //     apiKey: req.body.api_key
  //   }
  // .then(user => {

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
  .then( response => {
    return response.json()
  })
  .then( result => {
    console.log(result)
    return result
    // res.status(207).send(JSON.stringify(result));
    // res.status(207).send(result)
    // return res
  })
  .then(geocode => {
    var location = {
      location: req.query.location,
      lat: geocode['results'][0]['geometry']['location']['lat'],
      lng: geocode['results'][0]['geometry']['location']['lng']
    }
    Location.create(location)
    return location
    // res.status(207).send(JSON.stringify(location));
  })
  .then( location => {
      var ds_url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${location.lat},${location.lng}?exclude=minutely`
      console.log(ds_url)

      return fetch(ds_url, {headers: {Accept: 'application/json'}})
  })
  .then( response => {
    return response.json();
  })
  .then(result => {
    console.log(result)
    res.status(207).send(result);
  })
  .catch( err => {
      res.status(411).send("fail");
  })
})
module.exports = router;

    // fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)

    // fetch(`https://api.darksky.net/forecast/${process.env.DarkSkyAPI}/${location.lat},${location.lng}?exclude=minutely`)

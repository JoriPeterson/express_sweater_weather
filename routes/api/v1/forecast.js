var express = require('express');
var router = express.Router()
var User = require('../../../models').User
var Location = require('../../../models').Location
var fetch = require('node-fetch')
var dotenv = require('dotenv').config()

router.get("/", function(req, res, next){
  console.log("hit user")
  res.setHeader("Content-type", "application/json")

  User.findOne({
    where: {
      apiKey: req.body.api_key
    }
  })
  .then(user => {
    console.log(req.query.location)
    // return location
    // Location.find ({
    //   where: {
    //     location: req.query.location
    //   }
    // })
    // .then(location => {
      // console.log(location)
      // if (location === null) {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => response.json())
        .then(result => function()
          { var location = {location: req.query.location,
          lat: result['results'][0]['geometry']['location']['lat'],
          lng: result['results'][0]['geometry']['location']['lng']}

          Location.create(location)
          console.log(location)
          return(location)})

        // .catch(error => {
        //   res.status(401).send({what: "Some location problem"})
        // })
      // }
    // })
    .then(location => {
      console.log(`https://api.darksky.net/forecast/${process.env.DarkSkyAPI}/${location.lat},${location.lng}?exclude=minutely`)

      fetch(`https://api.darksky.net/forecast/${process.env.DarkSkyAPI}/${location.lat},${location.lng}?exclude=minutely`)
      .then(response => response.json())
      .then(res.status(200).send(result['currently']))

    })
    .catch(error => {
      res.status(401).send({what: "Some other problem"})
    })
  })
  // .catch(error => {
  //   res.status(401).send({what: "Invalid API Key"})
  // })
})

module.exports = router;

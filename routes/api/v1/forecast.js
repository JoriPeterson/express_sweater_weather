var express = require('express');
var router = express.Router();
var fetch = require('node-fetch')
var dotenv = require('dotenv').config()
var location = require('../../../models').Location

router.get("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")

  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.location}&key=${process.env.GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then(result => console.log(result))
})

module.exports = router;

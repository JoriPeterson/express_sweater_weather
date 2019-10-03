var express = require('express');
var fetch = require('node-fetch')
var router = express.Router();
var dotenv = require('dotenv').config()
var location = require('../../../models').Location

function getCoordinates() {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${process.env.GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then(result => console.log(result))
}

module.exports = router;

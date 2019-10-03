var express = require('express');
var router = express.Router();
var location = require('../../../models').Location
var darkSky = require('../../../services/darkSky')

function getCoordinates() {
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${process.env.GOOGLE_API_KEY}`)
  .then(response => response.json())
  .then(result => console.log(result))
}

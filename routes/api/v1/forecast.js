var express = require('express');
var router = express.Router();
var user = require('../../../models').Location

fetch(`https://maps.googleapis.com/maps/api/geocode/json?${location}&key=${process.env.GOOGLE_API_KEY}`)
.then(response => response.json())
.then(result => console.log(result[0].title))

var express = require('express');
var router = express.Router();
var user = require('../../../models').User
var bcrypt = require('bcrypt')
const saltRounds = 10
const uuidv1 = require('uuid/v1');

router.post("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")

  if (req.body.password === req.body.passwordConfirmation){
    user.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      apiKey: uuidv1()
    })
    .then(user => {
    res.status(201).send(JSON.stringify({ apiKey: user.apiKey }))
    })
    .catch(error => {
      res.status(500).send(JSON.stringify("Your information is not correct!"));
    })
  } else {
      res.status(401).send(JSON.stringify("Oh no! Something went wrong!"));
    }
  })

module.exports = router;

var express = require('express');
var router = express.Router();
var user = require('../../../models').User
var bcrypt = require('bcrypt')
const saltRounds = 10
const uuidv1 = require('uuid/v1');

router.post("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")

  if (req.body.password === req.body.passwordConfirmation
    && req.body.password.length > 1){
    user.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      apiKey: uuidv1()
    })
    .then(user => {
      res.status(201).send({ api_key: user.apiKey })
    })
    .catch(error => {
      res.status(500).send("Oh no! Something went wrong!")
    })

  } else {
      res.status(401).send("Your information is not correct!");
    }
  })

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../../../models').User
var bcrypt = require('bcrypt')
const saltRounds = 10;

router.post("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({api_key: user.apiKey})

      } else {
        res.status(401).send("Your information is not correct!");
      }
    })
    .catch(error => {
      res.status(500).send("Oops")
    })
  })

module.exports = router;

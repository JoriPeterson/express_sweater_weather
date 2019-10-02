var express = require('express');
var router = express.Router();

var user = require('../../../models').User

function generateAPI(){
  return "1234";
}

router.post("/", function(req, res, next){
  res.setHeader("Content-type", "application/json")

  user.create({
    email: req.body.email,
    password: req.body.password,
    apiKey: generateAPI()
  })
    .then(user => {
      payload = {
        apiKey: generateAPI()
      }
      res.status(201).send(payload)
    })
    .catch(error => {
      console.log(error)
      res.status(500).send({error})
    })
})

module.exports = router;

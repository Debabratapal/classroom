const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');

router.post('/signup', (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
  })
  bcrypt.genSalt(5)
  .then(salt => {
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
      user.password = hash;
      console.log(user);
      
      user.save()
      .then(result => {
        console.log(result);
        res.json({status: true, data: result})
      })
    })
    .catch(err => {
      console.log(err);
      
      res.send(err);
    })
  })
  .catch(err => {
    console.log(err);
    
    res.send(err)
  })
  
 
  
  
})

module.exports = router;
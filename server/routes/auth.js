const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const UserType = require('../model/user-type');

const middlewire = require('../middlewire/auth');

const constant = require('../constant');

router.post('/signup', (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    mobile: '+91'+req.body.mobile,
  })
  bcrypt.genSalt(5)
  .then(salt => {
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
      user.password = hash;
      user.save()
      .then(result => {
        res.json({status: true})
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

router.post('/login',(req, res) => {  
  let user = null;
  User.find({email:req.body.email})
  .then(data => {
    if(data.length > 0) {
      user = data[0];      
      return bcrypt.compare(req.body.password, user.password)
    }
    return res.json({status: false, msg: "Email Dose not Exist"})
  })
  .then(isMatched => {
    if(isMatched) {
      const obj = {
        _id: user._id,
        status: user.status,
        email: user.email,
        name: user.name
      }
      const token = jwt.sign(obj, constant.jwtSecret, {expiresIn: 60 * 60});
      return res.json({status:true, token, user: obj})
    }
    res.json({status:false, msg: "Email or password is wrong!"})
  })
  .catch(err => {
    console.log(err);
    res.send(err)
  })
});

router.post('/user-type', (req, res) => {
  const type = new UserType({
    user_type: req.body.type,
  })
  type.save().then(data => {
    res.json({status: true, data})
  })
})

router.post('/asign-user-type', (req, res) => {

})

//5c7ad623ecd8032f8c30fef4 admin
//5c7ad652ecd8032f8c30fef5 hod
//5c7ad674ecd8032f8c30fef6 faculty
module.exports = router;
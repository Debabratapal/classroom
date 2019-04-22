const router = require('express').Router();
const User = require('../model/user');

router.get('/', (req, res) => {
  User.find({status:"NEW"})
  .then(users => {
    res.json({status:true, users})
  })
  .catch(err => {
    res.send(err)
  })
});

router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id})
  .populate('user_group')
  .then(user => {
    res.json({status: true, group:user.user_group});
  })
  .catch(err => {
    res.send(err);
  })
})

router.patch('/change_status/:id', (req, res) => {
  User.updateOne({_id: req.params.id},{$set:{status: req.body.status}})
  .then(data => {
    console.log(data);
    
    res.json({status: true})
  })
})

router.patch('/:id', (req, res) => {
  const a = User.updateOne({_id: req.params.id},{$set: {status:'MEMBER'}})
  const b = User.updateOne({_id: req.body.user_id}, {$push :{user_group: req.params.id}})
  Promise.all([a,b])
  .then(data => {
    console.log(data);
    
    res.json({status: true})
  })

})




module.exports = router;
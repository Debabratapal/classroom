const router = require('express').Router();
const Room = require('../model/room');

router.post('/', (req, res) => {
  console.log(req.body);
  
  const body = req.body.room;
  let room = new Room(body); 
  room.save()
  .then(data =>{
    res.json({status: true, data})
  })
  .catch(err => {
    console.log(err);
    res.json({status: false, data: {}})
  })
})

router.get('/',(req, res) => {
  Room.find()
  .sort({_id: -1})
  .then(data => {
    res.json({status:true, data})
  })
  .catch(err => {
    res.json({status:false, data: []})
  })
})

router.put('/:id', (req, res) => {
  let body = req.body.room;
 Room.update({_id:req.params.id}, {$set:body})
 .then(data => {
   console.log(data);
   res.json({status: true})
 })
 .catch(err => {
   console.log(err);
   res.json({status: false})
 })
})

router.delete('/:id', (req, res) => {
  Room.remove({_id: req.params.id})
  .then(data => {
    console.log(data);
    res.json({status: true})
  })
  .catch(err=> {
    console.log(err);
    res.json({status: false})
  })
})

module.exports = router;
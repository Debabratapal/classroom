const router = require('express').Router()
const Booking = require('../model/booking');
const Room = require('../model/room');
const getBookingTableData = require('../helper/index');

router.get('/', (req, res) => {
  let bookings;
  Booking.find({})
  .populate({path:'room', select:'room_name'})
  .then(data => {
    console.log(data);
    
    if(data.length>0) {
      bookings = getBookingTableData(data);
      return data;
    }
    return [];
    
  })
  .then(data => {
    const rooms = data.map(el => el.room._id) || [];
    Room.find({_id:{$not:{$in:rooms}}})
    .then(room => {
      let roomObj
      if(room.length) {
        roomObj =room.map(room => {
          return {
            room: {
              _id: room._id,
              room_name: room.room_name
            },
            booking_times: []
          }
        })
        
      }
     
      let tranformBookings = [];
      tranformBookings.push(bookings || [])
      tranformBookings.push(roomObj || [])
      
      tranformBookings = tranformBookings.reduce((p,n) => p.concat(n))
      res.send(tranformBookings)
    })
  })
})

router.post('/', (req, res) => {
  
  const body = req.body;
  let booking = new Booking(body);
  booking.save().then(data => {
    res.json({status: true, data})
  })
})

module.exports = router;
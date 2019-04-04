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

router.post('/enquery', (req, res) => {
  
  const body = req.body;
  const features = body.features;
  let featureObj = {};

  for(let i of features) {
    featureObj[i] = true;
  }

  let query = {
    room_capacity:{
      $gte: body.room_capacity,
      $lte: +body.room_capacity+5,
    } 
  }
  
  query = {...query, ...featureObj};
  //5ca0b8ebf521296f56d5a9c0
  //5ca4e62505a7ad47cbb135ec
  let rooms;
  let roomList;
  Room.find(query)
  .then(room => {
    if(room.length === 0) {
      return res.json({msg: "no rooms", room: []})
    }
    const roomIds = room.map(el => el._id)
    rooms = roomIds;
    roomList = room;
    return roomIds;
  }) 
  .then(rooms => {
    return Booking.find({room: {$in: rooms}, start_time: {$lte: body.time}}).populate({path:'room'})
    
  })
  .then(bookings => {
    console.log(bookings);
    
    if(bookings.length === 0) {
      let emptyRoom = roomList.map(el => {
        console.log(el);
        
        return {
          room: {
            _id: el._id,
            room_name: el.room_name
          },
          booking_times: [],

        }
      })
      console.log(emptyRoom);
      
      return res.send(emptyRoom)
    }

    let data = getBookingTableData(bookings);
    console.log(data);
    
    res.send(data);
  })

  

})


module.exports = router;
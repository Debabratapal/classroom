const router = require('express').Router()
const Booking = require('../model/booking');
const Room = require('../model/room');
const getBookingTableData = require('../helper/index');

router.get('/', (req, res) => {
 console.log(req.query);
 
  let starttime = +req.query.start;
  let endtime = new Date(starttime);
  console.log(starttime);
  
  endtime.setHours(23);
  endtime.setMinutes(59);
  endtime = endtime.getTime();
  console.log(new Date(starttime));
  console.log(new Date(endtime));
  
  let query = {start_time: {$gte: starttime, $lt: endtime}}
  console.log(query);
  
  let bookings;
  Booking.find(query)
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
  console.log(body);
  
  let query = {
    room_capacity:{
      $gte: body.room_capacity,
      $lte: body.room_capacity+5,
    } 
  }
  
  query = {...query, ...featureObj};
  //5ca0b8ebf521296f56d5a9c0
  //5ca4e62505a7ad47cbb135ec
  console.log(query);
  
  let rooms;
  let roomList;
  Room.find(query)
  .then(room => {
    console.log(room);
    //find the room
    if(room.length === 0) {
      return res.json({msg: "no rooms", room: []})
    }
    const roomIds = room.map(el => el._id)
    rooms = roomIds;
    roomList = room;
    return roomIds;
  }) 
  .then(rooms => {
    let startTime = body.time;
    let endTime = new Date(startTime);
    endTime.setHours(23);
    endTime.setMinutes(59);
    endTime = endTime.getTime();

    let query2 = {
      room : { $in: rooms },
      start_time : {
        $gte: startTime,
        $lte: endTime,
      }
    } 
    
    return Booking.find(query2).populate({path:'room'})
    
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
  .catch(err => {
    console.log(err);
    
    res.send(err)
  })

  

})


module.exports = router;
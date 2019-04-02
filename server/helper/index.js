const getBookingTableData = (data) => {

  let bookingData = data.map(el => {
    let startHour = new Date(el.start_time).getHours();
    let endHour = new Date(el.end_time).getHours();
    let booking_times = [];

    for (let i = startHour; i < endHour; i++) {
      booking_times.push(i);
    }
    return {
      _id: el._id,
      room: {
        _id: el.room._id,
        room_name: el.room.room_name
      },
      booking_times,
      start_time: el.start_time
    }
  })

  const bookings = [];
  const rooms = bookingData.map(el => el.room._id);
  let uniqueRooms = [];
  for (let i of rooms) {
    if (!uniqueRooms.includes(i)) {
      uniqueRooms.push(i)
    }
  }
  for (let i of uniqueRooms) {
    let bookingObj = bookingData.find(el => el.room._id === i);
    let sameRoomTimings = bookingData.filter(el => el.room._id === i).map(el2 => el2.booking_times);
    let concatTimings = sameRoomTimings.reduce((p, n) => p.concat(n));
    console.log(concatTimings);
    bookingObj.booking_times = concatTimings;
    bookings.push(bookingObj)
  }

  return bookings


}

module.exports = getBookingTableData 
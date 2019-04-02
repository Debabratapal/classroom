const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  start_time: {
    type: Number,
  },
  end_time: {
    type: Number,
  }
})

module.exports = mongoose.model('booking', bookingSchema);
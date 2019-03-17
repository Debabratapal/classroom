const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room_name: {
    type: String,
    unique: true,
  },
  room_capacity: {
    type: Number,
  }
})

module.exports = mongoose.model('Room', roomSchema);
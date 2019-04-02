const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  room_name: {
    type: String,
    unique: true,
  },
  room_capacity: {
    type: Number,
  },
  ac: {
    type:Boolean,
    default: false,
  },
  mic: {
    type:Boolean,
    default: false,
  },
  projector: {
    type:Boolean,
    default: false,
  },
  wifi: {
    type:Boolean,
    default: false,
  }
})

module.exports = mongoose.model('Room', roomSchema);
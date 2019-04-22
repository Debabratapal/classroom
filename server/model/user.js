const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  name: {
    type: String
  },
  approved: {
    type: Boolean
  },
  status: {
    type: String,
    default: 'NEW'
  },
  user_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserType'
  },
  user_group: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
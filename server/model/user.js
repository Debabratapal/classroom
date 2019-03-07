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
  user_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserType'
  }
});

module.exports = mongoose.model('User', userSchema);
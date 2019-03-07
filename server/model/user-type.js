const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
  user_type: {
    type: String
  }
})

module.exports = mongoose.model('UserType', userTypeSchema);
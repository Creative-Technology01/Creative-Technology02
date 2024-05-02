const mongoose = require('mongoose');
// Define the schema for the Post model
const GamingSchema = new mongoose.Schema({
  postname: {
    type: String,
    required: true
  },
  postheading: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
});
const Gamingpost = mongoose.model('Gaming', GamingSchema);
module.exports = Gamingpost;
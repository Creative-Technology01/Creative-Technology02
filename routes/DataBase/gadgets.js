const mongoose = require('mongoose');
// Define the schema for the Post model
const GadgetsSchema = new mongoose.Schema({
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
const Gadgetspost = mongoose.model('Gadgets', GadgetsSchema);
module.exports = Gadgetspost;
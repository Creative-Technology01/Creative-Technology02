const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Creative-Technology")
// Define the schema for the Post model
const postSchema = new mongoose.Schema({
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
// Create the Post model using the defined schema
posts = mongoose.model('posts', postSchema);
module.exports = posts
// Export the model to use it in other parts of your application



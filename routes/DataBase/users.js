const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://priteshgupta032:Wr3JMPxIxU3h6yOV@creative-technology.40p6wzw.mongodb.net/Creative-Technology")
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



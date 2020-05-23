const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
   username: String,
   googleId: String,
   imageUrl: String,
   facebookId: String
});

//Export the model
module.exports = mongoose.model('User', userSchema);
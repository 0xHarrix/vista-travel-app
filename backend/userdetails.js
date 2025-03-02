const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone_number: String,
  profile_picture: String,
  nationality: String,
});

const UserDetails = mongoose.model('details', userDetailsSchema);

module.exports = UserDetails;

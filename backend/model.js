const mongoose = require('mongoose');

// Define the schema for the Place collection
const placeSchema = new mongoose.Schema({
  id: Number,
  place: String,
  locations: String,
  startingprice: String,
  imageUrl: String,
  latitude: String,
  longitude: String
});

// Create a model for the Place collection
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;

const mongoose = require('mongoose');

// Define the schema for the Place collection
const placeSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  locations: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

// Create a model for the Place collection
const Place = mongoose.model('Place', placeSchema);

module.exports = Place;

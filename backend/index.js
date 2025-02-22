const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const Place = require('./model');  // Make sure the model is defined correctly

const app = express();
const PORT = process.env.PORT || 3001;


const GOOGLE_PLACES_API_KEY = "AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes";

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://harris:har123sam@cluster0.aui8cjn.mongodb.net/Travel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Enable CORS
app.use(cors({ origin: '*' }));

// API endpoint to get all places from MongoDB
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find({});  // Fetch all places from the collection
    res.json(places);  // Return the places as JSON
    console.log(places);  // Log the places to the console for debugging
  } catch (error) {
    console.error('Error fetching places:', error);  // Log error if something goes wrong
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/places/recommendations', async (req, res) => {
  try {
      const { destination, budget } = req.query;
      const tripType = req.query.tripType?.trim(); // Remove unwanted spaces or newlines
      if (!destination || !budget || !tripType) {
          return res.status(400).json({ error: "Missing required parameters" });
      }

      // Get coordinates of the destination using Google Geocoding API
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${GOOGLE_PLACES_API_KEY}`;
      const geocodeResponse = await axios.get(geocodeUrl);
      const location = geocodeResponse.data.results[0]?.geometry.location;

      if (!location) {
          return res.status(404).json({ error: "Invalid destination" });
      }

      // Fetch places using Google Places API
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=${tripType}&key=${GOOGLE_PLACES_API_KEY}`;
      const placesResponse = await axios.get(placesUrl);

      // Filter places based on budget (assuming budget affects place type)
      const recommendedPlaces = placesResponse.data.results
      .filter(place => place.price_level === undefined || place.price_level <= Math.max(1, Math.ceil(budget / 1000))) // Allow undefined price_level
      .map(place => ({
          name: place.name,
          category: tripType,
          rating: place.rating || "No rating available",
          address: place.vicinity || "Address not available",
          location: place.geometry?.location
      }));
  
  console.log("Filtered Places:", recommendedPlaces); // Debug output
  

      res.json({ destination, tripType, recommendedPlaces });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

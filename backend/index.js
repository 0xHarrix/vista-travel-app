const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Place = require('./model');  // Make sure the model is defined correctly

const app = express();
const PORT = process.env.PORT || 3001;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

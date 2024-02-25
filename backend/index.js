const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware
const Place = require('./model'); // Assuming you have a Place model defined

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/places', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Enable CORS middleware
app.use(cors());

// Express route to fetch data from MongoDB
app.get('/api/places', async (req, res) => {
  try {
    const places = await Place.find({});
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const Place = require("./place");
const UserDetails = require("./userdetails");
const Notifications = require("./notifications");

const app = express();
const PORT = process.env.PORT || 3001;

const GOOGLE_PLACES_API_KEY = "AIzaSyA0E_xu1VBpJ7gxVvfZ8bMXqmNe3advwes";

mongoose
  .connect(
    "mongodb+srv://harris:har123sam@cluster0.aui8cjn.mongodb.net/users",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.use(cors({ origin: "*" }));


// Display places
app.get("/api/places", async (req, res) => {
  try {
    const places = await Place.find({});
    res.json(places);
    console.log(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Recommend Places
app.get("/places/recommendations", async (req, res) => {
  try {
    const { destination, budget } = req.query;
    const tripType = req.query.tripType?.trim();
    if (!destination || !budget || !tripType) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      destination
    )}&key=${GOOGLE_PLACES_API_KEY}`;
    const geocodeResponse = await axios.get(geocodeUrl);
    const location = geocodeResponse.data.results[0]?.geometry.location;

    if (!location) {
      return res.status(404).json({ error: "Invalid destination" });
    }

    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=${tripType}&key=${GOOGLE_PLACES_API_KEY}`;
    const placesResponse = await axios.get(placesUrl);

    const recommendedPlaces = placesResponse.data.results
      .filter(
        (place) =>
          place.price_level === undefined ||
          place.price_level <= Math.max(1, Math.ceil(budget / 1000))
      )
      .map((place) => ({
        name: place.name,
        category: tripType,
        rating: place.rating || "No rating available",
        address: place.vicinity || "Address not available",
        location: place.geometry?.location,
      }));

    console.log("Filtered Places:", recommendedPlaces);

    res.json({ destination, tripType, recommendedPlaces });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// Add user details
app.post("/api/userdetails", async (req, res) => {
  try {
    const { name, email, phone_number, profile_picture, nationality } =
      req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Missing required parameters (name and email)" });
    }

    const newUserDetail = new UserDetails({
      name,
      email,
      phone_number: phone_number || "",
      profile_picture: profile_picture || "",
      nationality: nationality || "Unknown",
    });

    await newUserDetail.save();
    res
      .status(201)
      .json({ message: "User details added", user: newUserDetail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update user details
app.put("/api/userdetails/:email", async (req, res) => {
  try {
    const { phone_number, profile_picture, nationality } = req.body;
    const email = req.params.email;

    const updatedUser = await UserDetails.findOneAndUpdate(
      { email },
      { $set: { phone_number, profile_picture, nationality } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User details updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Get Notifications of a user
app.get("/api/userdetails/:email/notifications", async (req, res) => {
  try {
    const email = req.params.email;
    const notifications = await Notifications.find({ email });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Clear notifications of a user
app.delete("/api/userdetails/:email/notifications", async (req, res) => {
  try {
    const email = req.params.email;
    await Notifications.deleteMany({ email });
    res.json({ message: "Notifications cleared" });
  } catch (error) {
    console.error("Error clearing notifications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Mark notifications as read
app.put("/api/userdetails/:email/notifications/read", async (req, res) => {
  try {
    const email = req.params.email;
    await Notifications
      .updateMany({ email }, { $set: { is_read: true } });
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

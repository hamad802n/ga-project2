const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  amenities: [String],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
}, {timestamps: true});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;

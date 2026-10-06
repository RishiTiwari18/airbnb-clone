const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  reviews: {
    type: Number,
    required: true,
  },

  maxGuests: {
    type: Number,
    required: true,
  },

  bedrooms: {
    type: Number,
    required: true,
  },

  bathrooms: {
    type: Number,
    required: true,
  },

  beds: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  host: {
    type: String,
    required: true,
  },

  hostExperience: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  images: {
    type: [String],
    required: true,
  },

  amenities: {
    type: [String],
    required: true,
  },
});

const Property = mongoose.model(
  "Property",
  propertySchema
);

module.exports = Property;
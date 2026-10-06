const mongoose = require("mongoose");
require("dotenv").config();

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

const properties = [
  {
    location: "Goa, India",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Beach",
    host: "Rahul",
    hostExperience: "5 years hosting",
    description:
      "A beautiful beachside apartment in Goa with amazing views and a peaceful atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1200",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200",
    ],
    amenities: [
      "WiFi",
      "Swimming Pool",
      "Air Conditioning",
      "Kitchen",
      "Free Parking",
    ],
  },

  {
    location: "Manali, India",
    price: 3500,
    rating: 4.7,
    reviews: 98,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Mountain",
    host: "Aman",
    hostExperience: "4 years hosting",
    description:
      "A cozy mountain home surrounded by beautiful Himalayan views and nature.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
    ],
    amenities: [
      "WiFi",
      "Heating",
      "Kitchen",
      "Mountain View",
      "Free Parking",
    ],
  },

  {
    location: "Jaipur, India",
    price: 3000,
    rating: 4.6,
    reviews: 76,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Heritage",
    host: "Priya",
    hostExperience: "3 years hosting",
    description:
      "A beautiful heritage-style home in Jaipur close to famous historical attractions.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
    ],
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Kitchen",
      "TV",
      "Free Parking",
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Property.deleteMany();

    await Property.insertMany(properties);

    console.log("Properties inserted successfully");

    await mongoose.disconnect();

    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seed failed:", error.message);
  }
}

seedDatabase();
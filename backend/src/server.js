const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Airbnb Backend is running");
});

app.get("/api/properties", (req, res) => {
  res.json([
    {
      id: 1,
      location: "Goa, India",
      price: 4500,
      rating: 4.8,
      reviews: 124,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      category: "Beach",
      host: "Rahul",
      hostExperience: "Hosting for 4 years",
      description:
        "Beautiful stay near the beach with a peaceful environment.",
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        "WiFi",
        "Pool",
        "Kitchen",
        "Air conditioning",
        "Free parking",
        "TV"
      ]
    },

    {
      id: 2,
      location: "Manali, India",
      price: 3200,
      rating: 4.7,
      reviews: 98,
      maxGuests: 3,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      category: "Mountain",
      host: "Aman",
      hostExperience: "Hosting for 3 years",
      description:
        "A comfortable mountain stay with beautiful views.",
      images: [
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        "WiFi",
        "Kitchen",
        "Heating",
        "Free parking",
        "TV"
      ]
    },

    {
      id: 3,
      location: "Jaipur, India",
      price: 2800,
      rating: 4.9,
      reviews: 156,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      category: "Heritage",
      host: "Priya",
      hostExperience: "Hosting for 5 years",
      description:
        "A traditional and comfortable stay in Jaipur.",
      images: [
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      ],
      amenities: [
        "WiFi",
        "Kitchen",
        "Breakfast",
        "TV",
        "Free parking"
      ]
    }
  ]);
});

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});
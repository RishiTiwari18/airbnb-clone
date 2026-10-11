require("dotenv").config();

const mongoose = require("mongoose");
const Property = require("./src/models/Property");

const properties = [
  {
    location: "Udaipur, India",
    price: 4200,
    rating: 4.9,
    reviews: 86,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Lakefront",
    host: "Arjun",
    hostExperience: "6 years hosting",
    description: "A peaceful lakeside villa in Udaipur with beautiful views, comfortable interiors and a relaxing outdoor space.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Lake View", "Free Parking"]
  },
  {
    location: "Shimla, India",
    price: 3200,
    rating: 4.7,
    reviews: 74,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Mountain",
    host: "Neha",
    hostExperience: "4 years hosting",
    description: "A cozy mountain cottage surrounded by pine trees with a balcony overlooking the Himalayan hills.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Mountain View", "Free Parking"]
  },
  {
    location: "Rishikesh, India",
    price: 2800,
    rating: 4.8,
    reviews: 92,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    beds: 2,
    category: "Nature",
    host: "Karan",
    hostExperience: "3 years hosting",
    description: "A tranquil riverside retreat with a minimalist interior, natural surroundings and a private balcony.",
    images: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200"
    ],
    amenities: ["WiFi", "Balcony", "Kitchen", "Garden", "Free Parking"]
  },
  {
    location: "Mumbai, India",
    price: 5500,
    rating: 4.6,
    reviews: 143,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "City",
    host: "Meera",
    hostExperience: "5 years hosting",
    description: "A modern city apartment with bright interiors, convenient transport access and a comfortable living area.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Elevator"]
  },
  {
    location: "Pondicherry, India",
    price: 3600,
    rating: 4.8,
    reviews: 68,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Beach",
    host: "Ananya",
    hostExperience: "4 years hosting",
    description: "A charming coastal home with pastel interiors, a relaxing courtyard and easy access to the beach.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1200",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Courtyard", "Air Conditioning", "Free Parking"]
  },
  {
    location: "Jaipur, India",
    price: 3100,
    rating: 4.7,
    reviews: 81,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Heritage",
    host: "Ishita",
    hostExperience: "7 years hosting",
    description: "A heritage-inspired residence featuring traditional decor, warm colors and a peaceful courtyard.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Courtyard", "TV"]
  },
  {
    location: "Manali, India",
    price: 3900,
    rating: 4.9,
    reviews: 117,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    beds: 4,
    category: "Mountain",
    host: "Dev",
    hostExperience: "5 years hosting",
    description: "A spacious mountain chalet with wooden interiors, scenic views and room for a family getaway.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Mountain View", "Fireplace"]
  },
  {
    location: "Bengaluru, India",
    price: 3400,
    rating: 4.5,
    reviews: 105,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    category: "City",
    host: "Vikram",
    hostExperience: "3 years hosting",
    description: "A stylish urban apartment with a dedicated workspace, modern furnishings and convenient city access.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    amenities: ["WiFi", "Workspace", "Kitchen", "Air Conditioning", "Elevator"]
  },
  {
    location: "Alibaug, India",
    price: 6200,
    rating: 4.8,
    reviews: 59,
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    beds: 5,
    category: "Beach",
    host: "Sana",
    hostExperience: "6 years hosting",
    description: "A spacious holiday villa with a private garden, comfortable bedrooms and an inviting outdoor area.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
    ],
    amenities: ["WiFi", "Swimming Pool", "Kitchen", "Garden", "Free Parking"]
  },
  {
    location: "Mussoorie, India",
    price: 3700,
    rating: 4.7,
    reviews: 88,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Mountain",
    host: "Rohan",
    hostExperience: "4 years hosting",
    description: "A hillside cottage with a cozy lounge, fresh mountain air and a balcony for enjoying the views.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Balcony", "Kitchen", "Free Parking"]
  },
  {
    location: "Agra, India",
    price: 2600,
    rating: 4.5,
    reviews: 64,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Heritage",
    host: "Pooja",
    hostExperience: "3 years hosting",
    description: "A comfortable traditional-style home offering a relaxing base for exploring the city's historic landmarks.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Free Parking"]
  },
  {
    location: "Varanasi, India",
    price: 2400,
    rating: 4.6,
    reviews: 97,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    beds: 2,
    category: "Cultural",
    host: "Aditi",
    hostExperience: "5 years hosting",
    description: "A welcoming guesthouse-inspired stay with comfortable interiors and convenient access to cultural attractions.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Laundry"]
  },
  {
    location: "Kochi, India",
    price: 3300,
    rating: 4.7,
    reviews: 72,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Coastal",
    host: "Nikhil",
    hostExperience: "4 years hosting",
    description: "A relaxed coastal apartment with airy rooms and a peaceful setting inspired by Kerala's tropical landscape.",
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1200",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Balcony", "Free Parking"]
  },
  {
    location: "Ooty, India",
    price: 2900,
    rating: 4.6,
    reviews: 53,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Nature",
    host: "Kavya",
    hostExperience: "3 years hosting",
    description: "A quiet hill-station cottage surrounded by greenery, perfect for a restful break away from busy city life.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Garden", "Kitchen", "Free Parking"]
  },
  {
    location: "Hyderabad, India",
    price: 3600,
    rating: 4.6,
    reviews: 112,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "City",
    host: "Aditya",
    hostExperience: "5 years hosting",
    description: "A contemporary apartment with a functional kitchen, inviting living room and convenient access to city attractions.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "TV", "Elevator"]
  },
  {
    location: "Darjeeling, India",
    price: 3100,
    rating: 4.8,
    reviews: 67,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Mountain",
    host: "Tenzin",
    hostExperience: "6 years hosting",
    description: "A mountain-view retreat with a warm interior and a peaceful atmosphere for enjoying the surrounding hills.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Mountain View", "Kitchen", "Free Parking"]
  },
  {
    location: "Gokarna, India",
    price: 2700,
    rating: 4.7,
    reviews: 49,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    beds: 2,
    category: "Beach",
    host: "Maya",
    hostExperience: "3 years hosting",
    description: "A laid-back coastal stay with simple interiors, natural surroundings and easy access to sandy beaches.",
    images: [
      "https://images.unsplash.com/photo-1505881502353-a1986add3762?w=1200",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Garden", "Balcony", "Free Parking"]
  },
  {
    location: "Jodhpur, India",
    price: 2800,
    rating: 4.6,
    reviews: 61,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Heritage",
    host: "Kabir",
    hostExperience: "5 years hosting",
    description: "A heritage-inspired home with colorful accents, a cozy courtyard and a welcoming atmosphere.",
    images: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Courtyard", "TV"]
  },
  {
    location: "Pune, India",
    price: 3200,
    rating: 4.5,
    reviews: 91,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "City",
    host: "Sneha",
    hostExperience: "4 years hosting",
    description: "A modern apartment with comfortable bedrooms, a well-equipped kitchen and a relaxing lounge area.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Workspace", "Free Parking"]
  },
  {
    location: "Munnar, India",
    price: 3500,
    rating: 4.8,
    reviews: 79,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Nature",
    host: "Joel",
    hostExperience: "5 years hosting",
    description: "A green hillside escape with a cozy interior and a serene setting near the region's scenic tea gardens.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Garden", "Mountain View", "Free Parking"]
  },
  {
    location: "Lonavala, India",
    price: 5800,
    rating: 4.8,
    reviews: 83,
    maxGuests: 7,
    bedrooms: 3,
    bathrooms: 3,
    beds: 4,
    category: "Villa",
    host: "Parth",
    hostExperience: "6 years hosting",
    description: "A spacious weekend villa with generous common areas and an outdoor space for relaxing with family or friends.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"
    ],
    amenities: ["WiFi", "Swimming Pool", "Kitchen", "Garden", "Free Parking"]
  },
  {
    location: "Amritsar, India",
    price: 2500,
    rating: 4.5,
    reviews: 58,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    beds: 2,
    category: "Cultural",
    host: "Gurpreet",
    hostExperience: "4 years hosting",
    description: "A welcoming city home with practical amenities and convenient access to local cultural landmarks.",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Free Parking"]
  },
  {
    location: "Srinagar, India",
    price: 4100,
    rating: 4.8,
    reviews: 94,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Lakefront",
    host: "Farah",
    hostExperience: "7 years hosting",
    description: "A serene stay inspired by Kashmiri hospitality, with cozy rooms and scenic surroundings.",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Kitchen", "Mountain View", "Free Parking"]
  },
  {
    location: "Kasauli, India",
    price: 3300,
    rating: 4.7,
    reviews: 46,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Mountain",
    host: "Simran",
    hostExperience: "3 years hosting",
    description: "A peaceful hillside cottage with a warm living space and a balcony overlooking the surrounding greenery.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Balcony", "Kitchen", "Garden"]
  },
  {
    location: "Chennai, India",
    price: 3700,
    rating: 4.6,
    reviews: 103,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "Coastal",
    host: "Hari",
    hostExperience: "5 years hosting",
    description: "A bright urban stay with modern amenities and convenient access to coastal attractions and restaurants.",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "TV", "Elevator"]
  },
  {
    location: "Nainital, India",
    price: 3400,
    rating: 4.8,
    reviews: 87,
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
    beds: 3,
    category: "Lakefront",
    host: "Aarav",
    hostExperience: "4 years hosting",
    description: "A comfortable hill-station retreat with scenic views and a relaxing atmosphere for a family holiday.",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200"
    ],
    amenities: ["WiFi", "Heating", "Mountain View", "Kitchen", "Free Parking"]
  },
  {
    location: "Delhi, India",
    price: 3900,
    rating: 4.6,
    reviews: 131,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    beds: 2,
    category: "City",
    host: "Ira",
    hostExperience: "6 years hosting",
    description: "A modern city apartment with a comfortable living area and convenient access to shopping and dining.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"
    ],
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Workspace", "Elevator"]
  }
];

async function addProperties() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the backend .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");

    let inserted = 0;
    let skipped = 0;

    for (const property of properties) {
      const result = await Property.updateOne(
        {
          location: property.location,
          host: property.host,
          description: property.description
        },
        {
          $setOnInsert: property
        },
        {
          upsert: true,
          runValidators: true
        }
      );

      if (result.upsertedCount === 1) {
        inserted++;
        console.log(`Added: ${property.location}`);
      } else {
        skipped++;
        console.log(`Already exists, skipped: ${property.location}`);
      }
    }

    console.log("\nProperty import completed");
    console.log(`New properties added: ${inserted}`);
    console.log(`Existing properties skipped: ${skipped}`);
    console.log("Existing database records were not deleted.");
  } catch (error) {
    console.error("Property import failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    console.log("MongoDB connection closed");
  }
}

addProperties();
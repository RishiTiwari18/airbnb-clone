const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

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

app.get("/", (req, res) => {
  res.send("Airbnb Backend is running");
});

app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch properties",
    });
  }
});

app.get("/api/properties/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch property",
    });
  }
});

app.post("/api/properties", async (req, res) => {
  try {
    const property = await Property.create(
      req.body
    );

    res.status(201).json(property);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create property",
    });
  }
});

app.put("/api/properties/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const property =
      await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update property",
    });
  }
});

app.delete("/api/properties/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const property =
      await Property.findByIdAndDelete(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete property",
    });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });
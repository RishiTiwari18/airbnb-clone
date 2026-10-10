const mongoose = require("mongoose");

const Property = require("../models/Property");
const User = require("../models/User");

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    return res.status(200).json(properties);
  } catch (error) {
    console.error("Get properties error:", error);

    return res.status(500).json({
      message: "Failed to fetch properties",
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error("Get property error:", error);

    return res.status(500).json({
      message: "Failed to fetch property",
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({
        message: "Please login to view your properties",
      });
    }

    const properties = await Property.find({
      hostId: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("Get my properties error:", error);

    return res.status(500).json({
      message: "Failed to fetch your properties",
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({
        message: "Please login to create a property",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        message: "Authenticated user not found",
      });
    }

    const {
      location,
      price,
      maxGuests,
      bedrooms,
      bathrooms,
      beds,
      category,
      hostExperience,
      description,
      images,
      amenities,
    } = req.body;

    if (
      typeof location !== "string" ||
      !location.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof hostExperience !== "string" ||
      !hostExperience.trim()
    ) {
      return res.status(400).json({
        message: "Please provide all required text fields",
      });
    }

    const numericFields = {
      price: Number(price),
      maxGuests: Number(maxGuests),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      beds: Number(beds),
    };

    if (
      !Number.isFinite(numericFields.price) ||
      numericFields.price <= 0 ||
      !Number.isInteger(numericFields.maxGuests) ||
      numericFields.maxGuests < 1 ||
      !Number.isInteger(numericFields.bedrooms) ||
      numericFields.bedrooms < 0 ||
      !Number.isInteger(numericFields.bathrooms) ||
      numericFields.bathrooms < 0 ||
      !Number.isInteger(numericFields.beds) ||
      numericFields.beds < 1
    ) {
      return res.status(400).json({
        message: "Please enter valid price and property details",
      });
    }

    if (
      !Array.isArray(images) ||
      images.length === 0 ||
      images.some(
        (image) =>
          typeof image !== "string" ||
          !image.trim()
      )
    ) {
      return res.status(400).json({
        message: "Please provide at least one valid image URL",
      });
    }

    if (
      !Array.isArray(amenities) ||
      amenities.some(
        (amenity) =>
          typeof amenity !== "string" ||
          !amenity.trim()
      )
    ) {
      return res.status(400).json({
        message: "Please provide valid amenities",
      });
    }

    const property = await Property.create({
      location: location.trim(),
      price: numericFields.price,
      rating: 0,
      reviews: 0,
      maxGuests: numericFields.maxGuests,
      bedrooms: numericFields.bedrooms,
      bathrooms: numericFields.bathrooms,
      beds: numericFields.beds,
      category: category.trim(),
      host: user.name,
      hostId: user._id,
      hostExperience: hostExperience.trim(),
      description: description.trim(),
      images: images.map((image) => image.trim()),
      amenities: amenities.map((amenity) => amenity.trim()),
    });

    return res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    console.error("Create property error:", error);

    return res.status(500).json({
      message: "Failed to create property",
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({
        message: "Please login to update a property",
      });
    }

    const property = await Property.findOne({
      _id: id,
      hostId: userId,
    });

    if (!property) {
      return res.status(404).json({
        message: "Property not found or you are not its owner",
      });
    }

    const allowedFields = [
      "location",
      "price",
      "maxGuests",
      "bedrooms",
      "bathrooms",
      "beds",
      "category",
      "hostExperience",
      "description",
      "images",
      "amenities",
    ];

    for (const field of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(
          req.body,
          field
        )
      ) {
        property.set(field, req.body[field]);
      }
    }

    await property.save();

    return res.status(200).json({
      message: "Property updated successfully",
      property,
    });
  } catch (error) {
    console.error("Update property error:", error);

    return res.status(400).json({
      message: "Failed to update property",
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    if (
      !userId ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(401).json({
        message: "Please login to delete a property",
      });
    }

    const property = await Property.findOneAndDelete({
      _id: id,
      hostId: userId,
    });

    if (!property) {
      return res.status(404).json({
        message: "Property not found or you are not its owner",
      });
    }

    return res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("Delete property error:", error);

    return res.status(500).json({
      message: "Failed to delete property",
    });
  }
};

module.exports = {
  getProperties,
  getPropertyById,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
};
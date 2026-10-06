const mongoose = require("mongoose");
const Property = require("../models/Property");

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch properties",
    });
  }
};

const getPropertyById = async (req, res) => {
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
};

const createProperty = async (req, res) => {
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
};

const updateProperty = async (req, res) => {
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
};

const deleteProperty = async (req, res) => {
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
};

module.exports = {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
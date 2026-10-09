const User = require("../models/User");
const Property = require("../models/Property");

const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).populate("wishlist");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch wishlist",
    });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      return res.status(400).json({
        message: "Property ID is required",
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const property = await Property.findById(
      propertyId
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyExists = user.wishlist.some(
      (id) => id.toString() === propertyId
    );

    if (alreadyExists) {
      return res.status(409).json({
        message: "Property is already in wishlist",
      });
    }

    user.wishlist.push(property._id);

    await user.save();

    res.status(200).json({
      message: "Property added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add property to wishlist",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(propertyId)) {
      return res.status(400).json({
        message: "Invalid Property ID",
      });
    }

    const user = await User.findById(
      req.user.userId
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const wishlistContainsProperty =
      user.wishlist.some(
        (id) => id.toString() === propertyId
      );

    if (!wishlistContainsProperty) {
      return res.status(404).json({
        message: "Property not found in wishlist",
      });
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== propertyId
    );

    await user.save();

    res.status(200).json({
      message: "Property removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove property from wishlist",
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
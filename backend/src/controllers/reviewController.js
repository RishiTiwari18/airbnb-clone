const mongoose = require("mongoose");
const Review = require("../models/Review");
const Property = require("../models/Property");

const getUserId = (user) => {
  return user?.userId || user?.id || user?._id;
};

const createReview = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { rating, comment } = req.body;
    const userId = getUserId(req.user);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({
        message: "Unable to identify authenticated user",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be an integer between 1 and 5",
      });
    }

    if (typeof comment !== "string" || comment.trim().length < 3) {
      return res.status(400).json({
        message: "Review must contain at least 3 characters",
      });
    }

    if (comment.trim().length > 1000) {
      return res.status(400).json({
        message: "Review cannot exceed 1000 characters",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const review = await Review.create({
      property: property._id,
      user: userId,
      rating: numericRating,
      comment: comment.trim(),
    });

    const populatedReview = await Review.findById(review._id)
      .populate("user", "name")
      .populate("property", "location price");

    return res.status(201).json({
      message: "Review created successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Create review error:", error);

    return res.status(500).json({
      message: "Unable to create review",
    });
  }
};

const getPropertyReviews = async (req, res) => {
  try {
    const { propertyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const reviews = await Review.find({
      property: propertyId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce((sum, review) => sum + review.rating, 0) /
          totalReviews;

    return res.status(200).json({
      reviews,
      totalReviews,
      averageRating: Number(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error("Get property reviews error:", error);

    return res.status(500).json({
      message: "Unable to fetch property reviews",
    });
  }
};

module.exports = {
  createReview,
  getPropertyReviews,
};
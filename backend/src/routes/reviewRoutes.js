const express = require("express");

const {
  createReview,
  getPropertyReviews,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/property/:propertyId",
  getPropertyReviews
);

router.post(
  "/property/:propertyId",
  protect,
  createReview
);

module.exports = router;
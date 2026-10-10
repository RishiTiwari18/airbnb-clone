const express = require("express");

const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const router = express.Router();

// Replace this import with your project's existing JWT middleware.
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBooking);

router.get("/my", authMiddleware, getMyBookings);

module.exports = router;
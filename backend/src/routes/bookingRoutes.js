const express = require("express");

const {
  createBooking,
  verifyPayment,
  getMyBookings,
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.post("/verify-payment", authMiddleware, verifyPayment);
router.get("/my", authMiddleware, getMyBookings);

module.exports = router;
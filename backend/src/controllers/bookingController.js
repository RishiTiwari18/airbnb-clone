const mongoose = require("mongoose");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const Booking = require("../models/Booking");
const Property = require("../models/Property");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!propertyId || !checkIn || !checkOut || guests === undefined) {
      return res.status(400).json({
        message: "Property, dates and guests are required",
      });
    }

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const guestCount = Number(guests);

    if (!Number.isInteger(guestCount) || guestCount < 1) {
      return res.status(400).json({
        message: "Guests must be a positive whole number",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({ message: "Invalid booking dates" });
    }

    const startDate = checkInDate.toISOString().slice(0, 10);
    const endDate = checkOutDate.toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    if (startDate >= endDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    if (startDate < today) {
      return res.status(400).json({
        message: "Check-in cannot be in the past",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const maxGuests = Number(property.maxGuests);

    if (
      Number.isFinite(maxGuests) &&
      maxGuests > 0 &&
      guestCount > maxGuests
    ) {
      return res.status(400).json({
        message: `Maximum capacity is ${maxGuests} guests`,
      });
    }

    const pricePerNight = Number(property.price);

    if (!Number.isFinite(pricePerNight) || pricePerNight <= 0) {
      return res.status(400).json({ message: "Property price is invalid" });
    }

    const start = new Date(`${startDate}T00:00:00.000Z`);
    const end = new Date(`${endDate}T00:00:00.000Z`);
    const nights = (end.getTime() - start.getTime()) / 86400000;

    if (!Number.isInteger(nights) || nights < 1) {
      return res.status(400).json({
        message: "Booking must be at least one night",
      });
    }

    const totalPrice = pricePerNight * nights;

    if (!Number.isSafeInteger(Math.round(totalPrice * 100))) {
      return res.status(400).json({ message: "Booking amount is too large" });
    }

    const overlappingBooking = await Booking.findOne({
      property: propertyId,
      status: { $in: ["pending", "confirmed"] },
      checkIn: { $lt: end },
      checkOut: { $gt: start },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "Property is already booked for these dates",
      });
    }

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      checkIn: start,
      checkOut: end,
      guests: guestCount,
      totalPrice,
      status: "pending",
      paymentStatus: "pending",
    });

    try {
      const order = await razorpay.orders.create({
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        receipt: booking._id.toString(),
        notes: {
          bookingId: booking._id.toString(),
          propertyId: propertyId.toString(),
        },
      });

      booking.razorpayOrderId = order.id;
      await booking.save();

      return res.status(201).json({
        message: "Booking created. Complete payment to confirm it.",
        bookingId: booking._id,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    } catch (paymentError) {
      await Booking.findByIdAndDelete(booking._id);
      throw paymentError;
    }
  } catch (error) {
    console.error("Create booking/order error:", error.message);

    return res.status(500).json({
      message: "Unable to create booking or payment order",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (
      !mongoose.isValidObjectId(bookingId) ||
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({ message: "Invalid payment details" });
    }

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus === "paid" && booking.status === "confirmed") {
      return res.status(200).json({
        message: "Payment already verified",
        booking,
      });
    }

    if (booking.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ message: "Order does not match booking" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const received = Buffer.from(razorpay_signature, "utf8");
    const expected = Buffer.from(expectedSignature, "utf8");

    if (
      received.length !== expected.length ||
      !crypto.timingSafeEqual(received, expected)
    ) {
      return res.status(400).json({ message: "Payment signature is invalid" });
    }

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    if (
      payment.order_id !== booking.razorpayOrderId ||
      payment.status !== "captured" ||
      payment.amount !== Math.round(booking.totalPrice * 100) ||
      payment.currency !== "INR"
    ) {
      return res.status(400).json({
        message: "Payment is not captured or amount does not match",
      });
    }

    booking.razorpayPaymentId = razorpay_payment_id;
    booking.paymentStatus = "paid";
    booking.status = "confirmed";

    await booking.save();

    return res.status(200).json({
      message: "Payment verified and booking confirmed",
      booking,
    });
  } catch (error) {
    console.error("Verify payment error:", error.message);

    return res.status(500).json({
      message: "Unable to verify payment",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const bookings = await Booking.find({ user: userId })
      .populate("property")
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error.message);

    return res.status(500).json({ message: "Unable to fetch bookings" });
  }
};

module.exports = {
  createBooking,
  verifyPayment,
  getMyBookings,
};
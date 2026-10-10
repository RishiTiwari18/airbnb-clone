const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Property = require("../models/Property");

const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    if (
      !propertyId ||
      !checkIn ||
      !checkOut ||
      guests === undefined
    ) {
      return res.status(400).json({
        message: "Property, dates and guests are required",
      });
    }

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({
        message: "Invalid property ID",
      });
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
      return res.status(400).json({
        message: "Invalid booking dates",
      });
    }

    const startDate = checkInDate.toISOString().slice(0, 10);
    const endDate = checkOutDate.toISOString().slice(0, 10);

    if (startDate >= endDate) {
      return res.status(400).json({
        message: "Check-out must be after check-in",
      });
    }

    const today = new Date().toISOString().slice(0, 10);

    if (startDate < today) {
      return res.status(400).json({
        message: "Check-in cannot be in the past",
      });
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
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

    if (!Number.isFinite(pricePerNight) || pricePerNight < 0) {
      return res.status(400).json({
        message: "Property price is invalid",
      });
    }

    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const nights = Math.round(
      (Date.parse(`${endDate}T00:00:00.000Z`) -
        Date.parse(`${startDate}T00:00:00.000Z`)) /
        millisecondsPerDay
    );

    if (nights < 1) {
      return res.status(400).json({
        message: "Booking must be at least one night",
      });
    }

    const totalPrice = pricePerNight * nights;

    const overlappingBooking = await Booking.findOne({
      property: propertyId,
      status: "confirmed",
      checkIn: { $lt: new Date(`${endDate}T00:00:00.000Z`) },
      checkOut: { $gt: new Date(`${startDate}T00:00:00.000Z`) },
    });

    if (overlappingBooking) {
      return res.status(409).json({
        message: "Property is already booked for these dates",
      });
    }

    const booking = await Booking.create({
      user: userId,
      property: propertyId,
      checkIn: new Date(`${startDate}T00:00:00.000Z`),
      checkOut: new Date(`${endDate}T00:00:00.000Z`),
      guests: guestCount,
      totalPrice,
      status: "confirmed",
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Unable to create booking",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.user?.userId || req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const bookings = await Booking.find({
      user: userId,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);

    return res.status(500).json({
      message: "Unable to fetch bookings",
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};
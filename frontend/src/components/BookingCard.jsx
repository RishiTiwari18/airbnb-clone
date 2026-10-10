import { useState } from "react";
import { createBooking } from "../services/bookingService";

function BookingCard({ property }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!property) {
    return null;
  }

  const pricePerNight = Number(
    property.price ?? property.pricePerNight ?? 0
  );

  const maxGuests = Math.max(
    1,
    Number(property.maxGuests) || 1
  );

  const today = new Date().toISOString().slice(0, 10);

  const getNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = Date.parse(`${checkIn}T00:00:00.000Z`);
    const end = Date.parse(`${checkOut}T00:00:00.000Z`);

    if (
      !Number.isFinite(start) ||
      !Number.isFinite(end) ||
      end <= start
    ) {
      return 0;
    }

    return Math.round(
      (end - start) / (24 * 60 * 60 * 1000)
    );
  };

  const nights = getNights();
  const totalPrice = nights * pricePerNight;

  const handleBooking = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!localStorage.getItem("token")) {
      setError("Please log in before booking a property.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (checkIn < today) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    if (guests < 1 || guests > maxGuests) {
      setError(`Guests must be between 1 and ${maxGuests}.`);
      return;
    }

    if (!property._id) {
      setError("Property ID is missing. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      await createBooking({
        propertyId: property._id,
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      setSuccess(
        "Booking created successfully! Your booking has been saved."
      );

      setCheckIn("");
      setCheckOut("");
      setGuests(1);
    } catch (err) {
      setError(
        err.message || "Unable to create booking. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="booking-card">
      <h2>Reserve your stay</h2>

      <p className="booking-nightly-price">
        <strong>
          ₹{pricePerNight.toLocaleString("en-IN")}
        </strong>{" "}
        / night
      </p>

      <form onSubmit={handleBooking}>
        <label htmlFor="booking-check-in">
          Check-in
        </label>

        <input
          id="booking-check-in"
          type="date"
          value={checkIn}
          min={today}
          onChange={(event) => {
            setCheckIn(event.target.value);

            if (
              checkOut &&
              event.target.value &&
              checkOut <= event.target.value
            ) {
              setCheckOut("");
            }

            setError("");
            setSuccess("");
          }}
          required
        />

        <label htmlFor="booking-check-out">
          Check-out
        </label>

        <input
          id="booking-check-out"
          type="date"
          value={checkOut}
          min={checkIn || today}
          onChange={(event) => {
            setCheckOut(event.target.value);
            setError("");
            setSuccess("");
          }}
          required
        />

        <label htmlFor="booking-guests">
          Guests
        </label>

        <select
          id="booking-guests"
          value={guests}
          onChange={(event) => {
            setGuests(Number(event.target.value));
            setError("");
            setSuccess("");
          }}
        >
          {Array.from(
            { length: maxGuests },
            (_, index) => index + 1
          ).map((count) => (
            <option key={count} value={count}>
              {count} {count === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>

        {nights > 0 && (
          <div className="booking-price-summary">
            <p>
              ₹{pricePerNight.toLocaleString("en-IN")} ×{" "}
              {nights} {nights === 1 ? "night" : "nights"}
            </p>

            <h3>
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </h3>
          </div>
        )}

        {error && (
          <p className="booking-error" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="booking-success" role="status">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="booking-button"
          disabled={loading}
        >
          {loading ? "Creating booking..." : "Reserve"}
        </button>
      </form>
    </section>
  );
}

export default BookingCard;
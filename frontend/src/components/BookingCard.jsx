import { useState } from "react";
import { createBooking, verifyPayment } from "../services/bookingService";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript && window.Razorpay) {
      resolve(true);
      return;
    }

    const script = existingScript || document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    if (!existingScript) {
      document.body.appendChild(script);
    }

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
  });
}

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

  const maxGuests = Math.max(1, Number(property.maxGuests) || 1);

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

    return Math.round((end - start) / (24 * 60 * 60 * 1000));
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

    const propertyId = property._id || property.id;

    if (!propertyId) {
      setError("Property ID is missing. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error(
          "Unable to load Razorpay Checkout. Check your internet connection."
        );
      }

      const order = await createBooking({
        propertyId,
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      if (!order.orderId || !order.keyId || !order.bookingId) {
        throw new Error("Payment order details are missing from the server.");
      }

      const options = {
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Airbnb Clone",
        description: `Booking for ${property.title || property.name || property.location || "property"}`,
        order_id: order.orderId,

        handler: async (paymentResponse) => {
          setLoading(true);
          setError("");
          setSuccess("");

          try {
            await verifyPayment({
              bookingId: order.bookingId,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            setSuccess(
              "Payment verified successfully! Your booking is confirmed."
            );

            setCheckIn("");
            setCheckOut("");
            setGuests(1);
          } catch (verificationError) {
            setError(
              `${verificationError.message} If money was deducted, check your booking status before trying again.`
            );
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },

        theme: {
          color: "#FF385C",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        setError(
          response.error?.description ||
            "Payment failed. Please try again."
        );
        setLoading(false);
      });

      razorpay.open();
    } catch (err) {
      setError(err.message || "Unable to start payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="booking-card">
      <h2>Reserve your stay</h2>

      <p className="booking-nightly-price">
        <strong>₹{pricePerNight.toLocaleString("en-IN")}</strong> / night
      </p>

      <form onSubmit={handleBooking}>
        <label htmlFor="booking-check-in">Check-in</label>

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

        <label htmlFor="booking-check-out">Check-out</label>

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

        <label htmlFor="booking-guests">Guests</label>

        <select
          id="booking-guests"
          value={guests}
          onChange={(event) => {
            setGuests(Number(event.target.value));
            setError("");
            setSuccess("");
          }}
        >
          {Array.from({ length: maxGuests }, (_, index) => index + 1).map(
            (count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "guest" : "guests"}
              </option>
            )
          )}
        </select>

        {nights > 0 && (
          <div className="booking-price-summary">
            <p>
              ₹{pricePerNight.toLocaleString("en-IN")} × {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </p>

            <h3>Total: ₹{totalPrice.toLocaleString("en-IN")}</h3>
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
          {loading ? "Processing..." : "Reserve & Pay"}
        </button>
      </form>
    </section>
  );
}

export default BookingCard;
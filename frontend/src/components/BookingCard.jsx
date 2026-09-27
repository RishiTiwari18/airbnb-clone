import { useState } from "react";

function BookingCard({
  price,
  rating,
  reviews,
  maxGuests,
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState(false);

  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference =
      endDate.getTime() - startDate.getTime();

    const nights =
      difference / (1000 * 60 * 60 * 24);

    return nights;
  };

  const nights = calculateNights();

  const totalPrice =
    nights > 0 ? nights * price : 0;

  const handleReserve = () => {
    setError("");

    if (!checkIn) {
      setError("Please select check-in date");
      return;
    }

    if (!checkOut) {
      setError("Please select check-out date");
      return;
    }

    if (checkOut <= checkIn) {
      setError(
        "Check-out date must be after check-in date"
      );
      return;
    }

    if (guests > maxGuests) {
      setError(
        `Maximum ${maxGuests} guests allowed`
      );
      return;
    }

    setBooked(true);
  };

  return (
    <aside className="booking-card">

      <div className="booking-price">
        <strong>
          ₹{price}
        </strong>

        <span> night</span>
      </div>

      <div className="booking-rating">
        ★ {rating} · {reviews} reviews
      </div>

      <div className="booking-fields">

        <div className="booking-field">
          <label>CHECK-IN</label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);

              if (
                checkOut &&
                e.target.value >= checkOut
              ) {
                setCheckOut("");
              }

              setError("");
              setBooked(false);
            }}
          />
        </div>

        <div className="booking-field">
          <label>CHECK-OUT</label>

          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setError("");
              setBooked(false);
            }}
          />
        </div>

        <div className="booking-field full">

          <label>GUESTS</label>

          <select
            value={guests}
            onChange={(e) => {
              setGuests(Number(e.target.value));
              setError("");
              setBooked(false);
            }}
          >
            {Array.from(
              {
                length: maxGuests,
              },
              (_, index) => (
                <option
                  key={index + 1}
                  value={index + 1}
                >
                  {index + 1}{" "}
                  {index === 0
                    ? "guest"
                    : "guests"}
                </option>
              )
            )}
          </select>

        </div>

      </div>

      {nights > 0 && (
        <div className="price-summary">

          <div>
            <span>
              ₹{price} × {nights} nights
            </span>

            <strong>
              ₹{totalPrice}
            </strong>
          </div>

          <div>
            <span>Guests</span>

            <strong>
              {guests}
            </strong>
          </div>

          <div className="total-price">
            <span>Total</span>

            <strong>
              ₹{totalPrice}
            </strong>
          </div>

        </div>
      )}

      {error && (
        <p className="booking-error">
          {error}
        </p>
      )}

      {booked && (
        <p className="booking-success">
          Booking request submitted successfully!
        </p>
      )}

      <button
        className="reserve-button"
        onClick={handleReserve}
      >
        Reserve
      </button>

      <p className="booking-note">
        You won't be charged yet
      </p>

    </aside>
  );
}

export default BookingCard;
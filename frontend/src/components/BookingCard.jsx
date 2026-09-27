function BookingCard({
  price,
  rating,
  reviews,
  maxGuests,
}) {
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

          <input type="date" />
        </div>

        <div className="booking-field">
          <label>CHECK-OUT</label>

          <input type="date" />
        </div>

        <div className="booking-field full">

          <label>GUESTS</label>

          <select defaultValue="1">

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

      <button className="reserve-button">
        Reserve
      </button>

      <p className="booking-note">
        You won't be charged yet
      </p>

    </aside>
  );
}

export default BookingCard;
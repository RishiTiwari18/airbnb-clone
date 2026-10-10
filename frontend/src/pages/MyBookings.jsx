import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMyBookings } from "../services/bookingService";

function formatDate(date) {
  if (!date) {
    return "Not available";
  }

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchMyBookings();

        if (active) {
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (active) {
          setError(
            err.message || "Unable to load your bookings."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="my-bookings-page">
        <div className="bookings-loading">
          <div className="booking-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="my-bookings-page">
        <div className="bookings-message bookings-error">
          <h2>Unable to load bookings</h2>
          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bookings-primary-button"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="my-bookings-page">
      <header className="my-bookings-header">
        <div>
          <p className="bookings-eyebrow">YOUR TRIPS</p>
          <h1>My Bookings</h1>
          <p className="bookings-subtitle">
            View and manage your property reservations.
          </p>
        </div>

        <Link to="/" className="bookings-primary-button">
          Explore properties
        </Link>
      </header>

      {bookings.length === 0 ? (
        <section className="bookings-empty">
          <div className="bookings-empty-icon">⌂</div>

          <h2>No bookings yet</h2>

          <p>
            You haven't booked a stay yet. Find a place for your
            next trip!
          </p>

          <Link to="/" className="bookings-primary-button">
            Find a stay
          </Link>
        </section>
      ) : (
        <>
          <div className="bookings-count">
            {bookings.length}{" "}
            {bookings.length === 1 ? "booking" : "bookings"}
          </div>

          <div className="my-bookings-list">
            {bookings.map((booking) => {
              const property = booking.property;

              const propertyId =
                property && typeof property === "object"
                  ? property._id
                  : property;

              const propertyName =
                property && typeof property === "object"
                  ? property.title ||
                    property.name ||
                    "Your reserved property"
                  : "Property details unavailable";

              const location =
                property && typeof property === "object"
                  ? property.location ||
                    property.city ||
                    property.address ||
                    ""
                  : "";

              const image =
                property && typeof property === "object"
                  ? property.image ||
                    property.imageUrl ||
                    (Array.isArray(property.images)
                      ? property.images[0]
                      : "")
                  : "";

              const status = booking.status || "confirmed";

              const nights =
                booking.checkIn && booking.checkOut
                  ? Math.max(
                      0,
                      Math.round(
                        (Date.parse(
                          `${String(booking.checkOut).slice(0, 10)}T00:00:00Z`
                        ) -
                          Date.parse(
                            `${String(booking.checkIn).slice(0, 10)}T00:00:00Z`
                          )) /
                          (24 * 60 * 60 * 1000)
                      )
                    )
                  : 0;

              return (
                <article
                  className="my-booking-card"
                  key={booking._id}
                >
                  <div className="my-booking-image-wrapper">
                    {image ? (
                      <img
                        src={image}
                        alt={propertyName}
                        className="my-booking-image"
                      />
                    ) : (
                      <div className="my-booking-image-placeholder">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="my-booking-content">
                    <div className="my-booking-top">
                      <div>
                        <p className="booking-reference">
                          BOOKING ID:{" "}
                          {booking._id
                            ? String(booking._id).slice(-8).toUpperCase()
                            : "N/A"}
                        </p>

                        <h2>{propertyName}</h2>

                        {location && (
                          <p className="my-booking-location">
                            {location}
                          </p>
                        )}
                      </div>

                      <span
                        className={`booking-status booking-status-${status}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="my-booking-details">
                      <div>
                        <span>CHECK-IN</span>
                        <strong>
                          {formatDate(booking.checkIn)}
                        </strong>
                      </div>

                      <div>
                        <span>CHECK-OUT</span>
                        <strong>
                          {formatDate(booking.checkOut)}
                        </strong>
                      </div>

                      <div>
                        <span>GUESTS</span>
                        <strong>
                          {booking.guests}{" "}
                          {Number(booking.guests) === 1
                            ? "guest"
                            : "guests"}
                        </strong>
                      </div>

                      <div>
                        <span>DURATION</span>
                        <strong>
                          {nights}{" "}
                          {nights === 1 ? "night" : "nights"}
                        </strong>
                      </div>
                    </div>

                    <div className="my-booking-footer">
                      <div>
                        <span className="booking-total-label">
                          Total price
                        </span>

                        <strong className="booking-total-price">
                          ₹
                          {Number(booking.totalPrice || 0).toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </div>

                      {propertyId && (
                        <Link
                          to={`/property/${propertyId}`}
                          className="booking-details-link"
                        >
                          View property →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

export default MyBookings;
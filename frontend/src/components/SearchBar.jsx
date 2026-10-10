import { useState } from "react";
import "./SearchBar.css";

const initialFilters = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  maxPrice: "",
  bedrooms: "",
};

function SearchBar({ onSearch, onReset }) {
  const [filters, setFilters] = useState(initialFilters);
  const [error, setError] = useState("");

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      filters.checkIn &&
      filters.checkOut &&
      filters.checkOut <= filters.checkIn
    ) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setError("");
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({ ...initialFilters });
    setError("");

    if (onReset) {
      onReset();
    } else {
      onSearch({ ...initialFilters });
    }
  };

  return (
    <section className="stay-search">
      <div className="stay-search-heading">
        <div>
          <p className="stay-search-eyebrow">FIND YOUR NEXT STAY</p>

          <h2>Where do you want to go?</h2>

          <p className="stay-search-subtitle">
            Discover a place that feels like home.
          </p>
        </div>
      </div>

      <form className="stay-search-form" onSubmit={handleSubmit}>
        <div className="stay-search-fields">
          <div className="stay-search-field destination-field">
            <label htmlFor="destination">Destination</label>

            <input
              id="destination"
              type="text"
              name="destination"
              placeholder="Search cities or locations"
              value={filters.destination}
              onChange={handleChange}
            />
          </div>

          <div className="stay-search-field">
            <label htmlFor="checkIn">Check-in</label>

            <input
              id="checkIn"
              type="date"
              name="checkIn"
              min={todayString}
              value={filters.checkIn}
              onChange={handleChange}
            />
          </div>

          <div className="stay-search-field">
            <label htmlFor="checkOut">Check-out</label>

            <input
              id="checkOut"
              type="date"
              name="checkOut"
              min={filters.checkIn || todayString}
              value={filters.checkOut}
              onChange={handleChange}
            />
          </div>

          <div className="stay-search-field">
            <label htmlFor="guests">Guests</label>

            <input
              id="guests"
              type="number"
              name="guests"
              min="1"
              max="100"
              placeholder="Number of guests"
              value={filters.guests}
              onChange={handleChange}
            />
          </div>

          <div className="stay-search-field">
            <label htmlFor="maxPrice">Maximum price/night (₹)</label>

            <input
              id="maxPrice"
              type="number"
              name="maxPrice"
              min="0"
              max="10000000"
              placeholder="Your budget"
              value={filters.maxPrice}
              onChange={handleChange}
            />
          </div>

          <div className="stay-search-field">
            <label htmlFor="bedrooms">Minimum bedrooms</label>

            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
            >
              <option value="">Any</option>
              <option value="1">1+ bedroom</option>
              <option value="2">2+ bedrooms</option>
              <option value="3">3+ bedrooms</option>
              <option value="4">4+ bedrooms</option>
              <option value="5">5+ bedrooms</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="stay-search-error" role="alert">
            {error}
          </p>
        )}

        <div className="stay-search-actions">
          <button type="button" onClick={handleReset}>
            Clear filters
          </button>

          <button type="submit" className="stay-search-submit">
            <span aria-hidden="true">⌕</span>
            Search stays
          </button>
        </div>
      </form>
    </section>
  );
}

export default SearchBar;
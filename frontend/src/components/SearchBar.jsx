import { useState } from "react";

function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
  if (!destination) {
    alert("Please select a destination");
    return;
  }

  if (!checkIn) {
    alert("Please select check-in date");
    return;
  }

  if (!checkOut) {
    alert("Please select check-out date");
    return;
  }

  onSearch({
    destination,
    checkIn,
    checkOut,
    guests,
  });

  setSearched(true);
};

  return (
    <div className="search-container">
      <div className="search-bar">
        <div className="search-item">
          <span>Where</span>
          <p>{destination || "Search destinations"}</p>
        </div>

        <div className="search-item">
          <span>Check in</span>

          <input
  type="date"
  value={checkIn}
  onChange={(e) => {
    const selectedDate = e.target.value;

    setCheckIn(selectedDate);

    if (checkOut && selectedDate > checkOut) {
      setCheckOut("");
    }
  }}
/>
        </div>

        <div className="search-item">
          <span>Check out</span>

          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="search-item">
          <span>Who</span>

          <p>
            {guests === 0
              ? "Add guests"
              : `${guests} guest${guests > 1 ? "s" : ""}`}
          </p>
        </div>

        <button
          className="search-button"
          onClick={handleSearch}
        >
          🔍
        </button>
      </div>

      <div className="destination-options">
        <button onClick={() => setDestination("Goa, India")}>
          Goa
        </button>

        <button onClick={() => setDestination("Manali, India")}>
          Manali
        </button>

        <button onClick={() => setDestination("Jaipur, India")}>
          Jaipur
        </button>
      </div>

      <div className="guest-options">
        <span>Guests</span>

        <button
          onClick={() => setGuests(guests - 1)}
          disabled={guests === 0}
        >
          −
        </button>

        <strong>{guests}</strong>

        <button
  onClick={() => setGuests(guests + 1)}
  disabled={guests === 10}
>
  +
</button>
      </div>

      {searched && (
        <p className="search-message">
          Search completed
        </p>
      )}
    </div>
  );
}

export default SearchBar;
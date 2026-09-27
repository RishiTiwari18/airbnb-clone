function Amenities({ amenities }) {
  return (
    <div className="details-section">

      <h2>What this place offers</h2>

      <div className="amenities-grid">

        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="amenity-item"
          >
            <span>✓</span>

            {amenity}
          </div>
        ))}

      </div>

    </div>
  );
}

export default Amenities;
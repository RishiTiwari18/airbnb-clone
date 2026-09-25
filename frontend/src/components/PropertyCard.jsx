function PropertyCard({ image, location, price, rating }) {
  return (
    <div className="property-card">

      <div className="property-image">
        <img src={image} alt={location} />
      </div>

      <div className="property-info">

        <div className="property-title">
          <h3>{location}</h3>
          <span>♡</span>
        </div>

        <p>250 km away</p>

        <p>12–17 Oct</p>

        <div className="property-bottom">
          <strong>₹{price} night</strong>
          <span>★ {rating}</span>
        </div>

      </div>

    </div>
  );
}

export default PropertyCard;
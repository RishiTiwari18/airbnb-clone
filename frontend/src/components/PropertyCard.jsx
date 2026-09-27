import { useState } from "react";
import { Link } from "react-router-dom";

function PropertyCard({
  id,
  image,
  location,
  price,
  rating,
}) {
  const [isWishlisted, setIsWishlisted] =
    useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <Link
      to={`/property/${id}`}
      className="property-card-link"
    >
      <div className="property-card">
        <div className="property-image">
          <img
            src={image}
            alt={location}
          />

          <button
            className="wishlist-button"
            onClick={handleWishlist}
          >
            {isWishlisted ? "♥" : "♡"}
          </button>
        </div>

        <div className="property-info">
          <div className="property-title">
            <h3>{location}</h3>
          </div>

          <p>250 km away</p>

          <p>12–17 Oct</p>

          <div className="property-bottom">
            <strong>₹{price} night</strong>

            <span>★ {rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PropertyCard;
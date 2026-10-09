import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  addToWishlist,
  removeFromWishlist,
  fetchWishlist,
} from "../services/wishlistService";

function PropertyCard({ property }) {
  const { user, loading } = useAuth();

  const [saved, setSaved] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistError, setWishlistError] = useState("");

  const propertyId = property?._id || property?.id;

  const imageUrl = Array.isArray(property?.images)
    ? property.images[0]
    : property?.image || "";

  const location = property?.location || "Location unavailable";
  const price = property?.price;
  const title =
    property?.title ||
    property?.name ||
    `Stay in ${location.split(",")[0]}`;

  useEffect(() => {
    let active = true;

    const checkWishlist = async () => {
      if (loading) return;

      if (!user || !propertyId) {
        setSaved(false);
        return;
      }

      try {
        const wishlist = await fetchWishlist();

        if (active) {
          setSaved(
            wishlist.some(
              (item) =>
                String(item._id || item.id) === String(propertyId)
            )
          );
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    checkWishlist();

    return () => {
      active = false;
    };
  }, [user, loading, propertyId]);

  const handleWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      setWishlistError("Please log in to save properties.");
      return;
    }

    if (!propertyId) {
      setWishlistError("Property ID is missing.");
      return;
    }

    try {
      setWishlistLoading(true);
      setWishlistError("");

      if (saved) {
        await removeFromWishlist(propertyId);
        setSaved(false);
      } else {
        await addToWishlist(propertyId);
        setSaved(true);
      }
    } catch (error) {
      setWishlistError(
        error.message || "Failed to update wishlist."
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  if (!property) return null;

  return (
    <article className="property-card">
      <div className="property-card-image-container">
        <Link to={`/property/${propertyId}`}>
          {imageUrl ? (
            <img
              className="property-card-image"
              src={imageUrl}
              alt={title}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="property-card-image-placeholder">
              No image available
            </div>
          )}
        </Link>

        <button
          type="button"
          className={`wishlist-heart ${saved ? "saved" : ""}`}
          onClick={handleWishlist}
          disabled={wishlistLoading || loading}
          aria-label={
            saved ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={saved}
        >
          {wishlistLoading ? "…" : saved ? "♥" : "♡"}
        </button>
      </div>

      <div className="property-card-content">
        <Link
          to={`/property/${propertyId}`}
          className="property-card-title-link"
        >
          <h3 className="property-card-title">{title}</h3>
        </Link>

        <p className="property-card-location">{location}</p>

        {property.rating != null && (
          <p className="property-card-rating">
            ★ {property.rating}
            {property.reviews != null &&
              ` (${property.reviews} reviews)`}
          </p>
        )}

        {price != null && (
          <p className="property-card-price">
            <strong>
              ₹{Number(price).toLocaleString("en-IN")}
            </strong>{" "}
            per night
          </p>
        )}

        {wishlistError && (
          <p className="wishlist-error" role="alert">
            {wishlistError}
          </p>
        )}
      </div>
    </article>
  );
}

export default PropertyCard;
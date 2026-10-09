import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWishlist = async () => {
    try {
      setError("");

      const properties = await fetchWishlist();

      setWishlist(properties);
    } catch (error) {
      setError(error.message || "Unable to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleRemove = async (propertyId) => {
    try {
      await removeFromWishlist(propertyId);

      setWishlist((previousWishlist) =>
        previousWishlist.filter(
          (property) => property._id !== propertyId
        )
      );
    } catch (error) {
      setError(error.message || "Unable to remove property");
    }
  };

  if (loading) {
    return <h2>Loading wishlist...</h2>;
  }

  return (
    <main className="wishlist-page">
      <h1>My Wishlist</h1>

      {error && <p role="alert">{error}</p>}

      {wishlist.length === 0 ? (
        <div>
          <p>You have not saved any properties yet.</p>
          <Link to="/">Explore properties</Link>
        </div>
      ) : (
        <div className="property-grid">
          {wishlist.map((property) => (
            <article
              className="property-card"
              key={property._id}
            >
              <Link to={`/property/${property._id}`}>
                <img
                  src={property.image}
                  alt={property.title}
                />

                <h2>{property.title}</h2>
              </Link>

              <p>{property.location}</p>
              <p>₹{property.price} per night</p>

              <button
                type="button"
                onClick={() => handleRemove(property._id)}
              >
                Remove from Wishlist
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
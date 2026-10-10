import { useEffect, useState } from "react";
import { getPropertyReviews } from "../services/reviewService";

function ReviewList({ propertyId, refreshKey = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPropertyReviews(propertyId);

        if (ignore) return;

        setReviews(data.reviews || []);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (err) {
        if (!ignore) {
          setError(err.message || "Failed to load reviews.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      ignore = true;
    };
  }, [propertyId, refreshKey]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section className="review-list">
      <h3>
        Guest Reviews ({totalReviews})
      </h3>

      <p>
        Average Rating: {averageRating.toFixed(1)} / 5
      </p>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this property!</p>
      ) : (
        reviews.map((review) => (
          <article
            className="review-item"
            key={review._id}
          >
            <h4>
              {review.user?.name || "Guest"}
            </h4>

            <p>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
              {" "}
              ({review.rating}/5)
            </p>

            <p>{review.comment}</p>

            <small>
              {review.createdAt
                ? new Date(review.createdAt).toLocaleDateString()
                : ""}
            </small>
          </article>
        ))
      )}
    </section>
  );
}

export default ReviewList;
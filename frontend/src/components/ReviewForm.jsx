import { useState } from "react";
import { createReview } from "../services/reviewService";

function ReviewForm({ propertyId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!comment.trim() || comment.trim().length < 3) {
      setError("Please write at least 3 characters.");
      return;
    }

    if (comment.trim().length > 1000) {
      setError("Review cannot exceed 1000 characters.");
      return;
    }

    try {
      setLoading(true);

      await createReview(propertyId, {
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);
      setSuccess("Your review has been submitted.");

      if (onReviewSubmitted) {
        await onReviewSubmitted();
      }
    } catch (err) {
      setError(err.message || "Unable to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="review-form">
      <h3>Write a Review</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="review-rating">
          Your Rating
        </label>

        <select
          id="review-rating"
          value={rating}
          onChange={(event) =>
            setRating(Number(event.target.value))
          }
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Very Good</option>
          <option value={3}>3 - Good</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>

        <label htmlFor="review-comment">
          Your Review
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) =>
            setComment(event.target.value)
          }
          placeholder="Share your experience..."
          minLength={3}
          maxLength={1000}
          rows={4}
          required
        />

        <p>{comment.length}/1000 characters</p>

        {error && (
          <p role="alert" className="review-error">
            {error}
          </p>
        )}

        {success && (
          <p className="review-success">
            {success}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
}

export default ReviewForm;
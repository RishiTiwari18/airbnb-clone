import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/reviews`;

export const getPropertyReviews = async (propertyId) => {
  const response = await fetch(
    `${API_URL}/property/${propertyId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
};

export const createReview = async (propertyId, reviewData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login to submit a review");
  }

  const response = await fetch(
    `${API_URL}/property/${propertyId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit review");
  }

  return data;
};
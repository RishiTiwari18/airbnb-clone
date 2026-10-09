const API_URL = "http://localhost:5000/api/wishlist";

const getToken = () => {
  return localStorage.getItem("token");
};

const getHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchWishlist = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch wishlist");
  }

  return data.wishlist;
};

export const addToWishlist = async (propertyId) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ propertyId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add property");
  }

  return data;
};

export const removeFromWishlist = async (propertyId) => {
  const response = await fetch(
    `${API_URL}/${propertyId}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove property");
  }

  return data;
};
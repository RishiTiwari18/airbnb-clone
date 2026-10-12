import API_BASE_URL from "./api";

const API_URL = `${API_BASE_URL}/api/properties`;

const getToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login first");
  }

  return token;
};

const request = async (url, options = {}) => {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getMyProperties = async () => {
  return request(`${API_URL}/my-listings`);
};

export const createProperty = async (propertyData) => {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(propertyData),
  });
};

export const updateProperty = async (propertyId, propertyData) => {
  return request(`${API_URL}/${propertyId}`, {
    method: "PUT",
    body: JSON.stringify(propertyData),
  });
};

export const deleteProperty = async (propertyId) => {
  return request(`${API_URL}/${propertyId}`, {
    method: "DELETE",
  });
};
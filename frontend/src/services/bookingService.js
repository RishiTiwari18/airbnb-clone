const API_URL = "http://localhost:5000/api/bookings";

const getToken = () => localStorage.getItem("token");

export const createBooking = async ({
  propertyId,
  checkIn,
  checkOut,
  guests,
}) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to book a property");
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      propertyId,
      checkIn,
      checkOut,
      guests,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create booking");
  }

  return data.booking;
};

export const fetchMyBookings = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to view your bookings");
  }

  const response = await fetch(`${API_URL}/my`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch bookings");
  }

  return data.bookings;
};
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ImageGallery from "../components/ImageGallery";
import HostInfo from "../components/HostInfo";
import Amenities from "../components/Amenities";
import BookingCard from "../components/BookingCard";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch property"
          );
        }

        const data = await response.json();

        setProperty(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load property");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  if (loading) {
    return (
      <main className="loading-container">
        <h2>Loading property...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>

        <Link to="/">
          Go back to home
        </Link>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="property-not-found">
        <h2>Property not found</h2>

        <Link to="/">
          Go back to home
        </Link>
      </main>
    );
  }

  return (
    <main className="property-details-page">
      <div className="details-header">
        <Link to="/" className="back-button">
          ← Back
        </Link>

        <div className="details-actions">
          <button>Share</button>
          <button>Save</button>
        </div>
      </div>

      <h1 className="details-title">
        {property.location}
      </h1>

      <div className="details-rating">
        <span>★ {property.rating}</span>
        <span>·</span>
        <span>{property.reviews} reviews</span>
      </div>

      <ImageGallery
        images={property.images}
        location={property.location}
      />

      <div className="details-layout">
        <section className="details-main">
          <HostInfo
            location={property.location}
            maxGuests={property.maxGuests}
            bedrooms={property.bedrooms}
            beds={property.beds}
            bathrooms={property.bathrooms}
            host={property.host}
            hostExperience={property.hostExperience}
          />

          <div className="details-section">
            <h2>About this place</h2>

            <p>{property.description}</p>
          </div>

          <Amenities
            amenities={property.amenities}
          />
        </section>

        <BookingCard
          price={property.price}
          rating={property.rating}
          reviews={property.reviews}
          maxGuests={property.maxGuests}
        />
      </div>
    </main>
  );
}

export default PropertyDetails;
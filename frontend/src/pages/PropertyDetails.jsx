import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const API_URL = "http://localhost:5000/api/properties";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewRefreshKey, setReviewRefreshKey] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch property details"
          );
        }

        const propertyData = data.property || data;

        setProperty(propertyData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    } else {
      setError("Property ID is missing");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Go back to home</Link>
      </div>
    );
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  const image =
    property.image ||
    property.imageUrl ||
    (Array.isArray(property.images) ? property.images[0] : "");

  const title = property.title || property.name || "Untitled Property";

  const location =
    property.location ||
    property.city ||
    property.address ||
    "Location not available";

  const price = property.price ?? property.pricePerNight;

  return (
    <div className="property-details-page">
      <Link to="/">← Back to home</Link>

      <div className="property-details-layout">
        <div className="property-details-content">
          {image && (
            <img
              src={image}
              alt={title}
              className="property-details-image"
            />
          )}

          <h1>{title}</h1>

          <p>{location}</p>

          <p>
            <strong>
              ★ {Number(property.rating || 0).toFixed(1)}
            </strong>{" "}
            ({property.reviews || 0} reviews)
          </p>

          {property.description && <p>{property.description}</p>}

          {price !== undefined && (
            <p>
              <strong>₹{price}</strong> per night
            </p>
          )}

          {property.maxGuests !== undefined && (
            <p>Maximum guests: {property.maxGuests}</p>
          )}

          {property.bedrooms !== undefined && (
            <p>Bedrooms: {property.bedrooms}</p>
          )}

          {property.bathrooms !== undefined && (
            <p>Bathrooms: {property.bathrooms}</p>
          )}

          {property.beds !== undefined && (
            <p>Beds: {property.beds}</p>
          )}

          {property.host && (
            <div className="property-host">
              <h2>Hosted by {property.host}</h2>

              {property.hostExperience && (
                <p>{property.hostExperience}</p>
              )}
            </div>
          )}

          {Array.isArray(property.amenities) &&
            property.amenities.length > 0 && (
              <div className="property-amenities">
                <h2>Amenities</h2>

                <ul>
                  {property.amenities.map((amenity, index) => (
                    <li key={`${amenity}-${index}`}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <div className="property-details-booking">
          <BookingCard property={property} />
        </div>
      </div>

      <section className="property-reviews">
        <ReviewList
          propertyId={id}
          refreshKey={reviewRefreshKey}
        />

        <ReviewForm
          propertyId={id}
          onReviewSubmitted={() =>
            setReviewRefreshKey((previous) => previous + 1)
          }
        />
      </section>
    </div>
  );
}

export default PropertyDetails;
import { Link, useParams } from "react-router-dom";

import properties from "../data/properties";

import ImageGallery from "../components/ImageGallery";
import HostInfo from "../components/HostInfo";
import Amenities from "../components/Amenities";
import BookingCard from "../components/BookingCard";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

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

        <Link
          to="/"
          className="back-button"
        >
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

        <span>
          ★ {property.rating}
        </span>

        <span>·</span>

        <span>
          {property.reviews} reviews
        </span>

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

            <p>
              {property.description}
            </p>

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
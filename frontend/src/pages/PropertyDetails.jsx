import { useParams } from "react-router-dom";
import properties from "../data/properties";

function PropertyDetails() {
  const { id } = useParams();

  const property = properties.find(
    (item) => item.id === Number(id)
  );

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <main className="property-details">
      <img
        src={property.image}
        alt={property.location}
        className="details-image"
      />

      <div className="details-content">
        <h1>{property.location}</h1>

        <p>★ {property.rating}</p>

        <p>{property.description}</p>

        <div className="property-features">
          <span>{property.maxGuests} guests</span>

          <span>
            {property.bedrooms} bedrooms
          </span>

          <span>
            {property.bathrooms} bathroom
          </span>
        </div>

        <h2>₹{property.price} / night</h2>

        <button className="reserve-button">
          Reserve
        </button>
      </div>
    </main>
  );
}

export default PropertyDetails;
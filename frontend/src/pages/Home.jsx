import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import CategoryBar from "../components/CategoryBar";

import properties from "../data/properties.js";

function Home() {
  const [propertyData, setPropertyData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchData, setSearchData] =
    useState({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 0,
    });

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    const loadProperties = () => {
      try {
        setLoading(true);
        setError("");

        setTimeout(() => {
          setPropertyData(properties);
          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(
          "Unable to load properties"
        );

        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const filteredProperties =
    propertyData.filter((property) => {
      const destinationMatch =
        !searchData.destination ||
        property.location
          .toLowerCase()
          .includes(
            searchData.destination.toLowerCase()
          );

      const guestsMatch =
        searchData.guests === 0 ||
        property.maxGuests >=
          searchData.guests;

      const categoryMatch =
        selectedCategory === "All" ||
        property.category ===
          selectedCategory;

      return (
        destinationMatch &&
        guestsMatch &&
        categoryMatch
      );
    });

  return (
    <main>
      <h1>Find your next stay</h1>

      <SearchBar
        onSearch={setSearchData}
      />

      <CategoryBar
        selectedCategory={
          selectedCategory
        }
        onCategoryChange={
          setSelectedCategory
        }
      />

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>

          <p>
            Loading properties...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="error-container">
          <h2>
            Something went wrong
          </h2>

          <p>{error}</p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        filteredProperties.length === 0 && (
          <div className="empty-container">
            <h2>
              No properties found
            </h2>

            <p>
              Try changing your search
              or category.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        filteredProperties.length > 0 && (
          <div className="property-list">
            {filteredProperties.map(
              (property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  images={property.images}
                  location={
                    property.location
                  }
                  price={property.price}
                  rating={property.rating}
                />
              )
            )}
          </div>
        )}
    </main>
  );
}

export default Home;
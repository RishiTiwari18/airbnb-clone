import { useState } from "react";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import CategoryBar from "../components/CategoryBar";
import properties from "../data/properties";

function Home() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  });

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredProperties = properties.filter((property) => {
    const destinationMatch =
      !searchData.destination ||
      property.location
        .toLowerCase()
        .includes(searchData.destination.toLowerCase());

    const guestsMatch =
      searchData.guests === 0 ||
      property.maxGuests >= searchData.guests;

    const categoryMatch =
      selectedCategory === "All" ||
      property.category === selectedCategory;

    return (
      destinationMatch &&
      guestsMatch &&
      categoryMatch
    );
  });

  return (
    <main>
      <h1>Find your next stay</h1>

      <SearchBar onSearch={setSearchData} />

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="property-list">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              images={property.images}
              location={property.location}
              price={property.price}
              rating={property.rating}
            />
          ))
        ) : (
          <p className="no-results">
            No properties found.
          </p>
        )}
      </div>
    </main>
  );
}

export default Home;
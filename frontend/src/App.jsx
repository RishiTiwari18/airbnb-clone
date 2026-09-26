import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import PropertyCard from "./components/PropertyCard";

const properties = [
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    location: "Goa, India",
    price: 4500,
    rating: 4.8,
    maxGuests: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
    location: "Manali, India",
    price: 3200,
    rating: 4.7,
    maxGuests: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    location: "Jaipur, India",
    price: 2800,
    rating: 4.9,
    maxGuests: 2,
  },
];

function App() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  });
const filteredProperties = properties.filter((property) => {
  const destinationMatch =
    !searchData.destination ||
    property.location
      .toLowerCase()
      .includes(searchData.destination.toLowerCase());

  const guestsMatch =
    searchData.guests === 0 ||
    property.maxGuests >= searchData.guests;

  return destinationMatch && guestsMatch;
});
  return (
    <>
      <Navbar />

      <main>
        <h1>Find your next stay</h1>

        <SearchBar onSearch={setSearchData} />

        {searchData.destination && (
          <div className="search-result">
            {filteredProperties.length > 0
              ? `${filteredProperties.length} properties found in ${searchData.destination}`
              : `No properties found in ${searchData.destination}`}
          </div>
        )}

        <div className="property-list">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.location}
              image={property.image}
              location={property.location}
              price={property.price}
              rating={property.rating}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
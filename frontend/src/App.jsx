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
  },
  {
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
    location: "Manali, India",
    price: 3200,
    rating: 4.7,
  },
  {
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    location: "Jaipur, India",
    price: 2800,
    rating: 4.9,
  },
];

function App() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Find your next stay</h1>

        <SearchBar />

        <div className="property-list">
          {properties.map((property) => (
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
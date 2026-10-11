import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryBar from "../components/CategoryBar";
import PropertyCard from "../components/PropertyCard";
import "./Home.css";

const initialFilters = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  maxPrice: "",
  bedrooms: "",
};

const API_URL = "http://localhost:5000/api/properties";

function Home() {
  const [properties, setProperties] = useState([]);
  const [searchFilters, setSearchFilters] = useState(initialFilters);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load properties.");
        }

        const data = await response.json();

        const propertyList = Array.isArray(data)
          ? data
          : Array.isArray(data.properties)
            ? data.properties
            : Array.isArray(data.data)
              ? data.data
              : null;

        if (!propertyList) {
          throw new Error("Unexpected response from the server.");
        }

        setProperties(propertyList);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Property loading error:", err);
          setError(
            "Unable to load properties. Please check that the backend server is running."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        properties
          .map((property) => property.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const destination = searchFilters.destination
        .trim()
        .toLowerCase();

      const location = (property.location || "").toLowerCase();
      const description = (property.description || "").toLowerCase();

      const matchesDestination =
        !destination ||
        location.includes(destination) ||
        description.includes(destination);

      const guests = Number(searchFilters.guests);

      const matchesGuests =
        !searchFilters.guests ||
        Number(property.maxGuests) >= guests;

      const maxPrice = Number(searchFilters.maxPrice);

      const matchesPrice =
        !searchFilters.maxPrice ||
        Number(property.price) <= maxPrice;

      const bedrooms = Number(searchFilters.bedrooms);

      const matchesBedrooms =
        !searchFilters.bedrooms ||
        Number(property.bedrooms) >= bedrooms;

      const matchesCategory =
        selectedCategory === "All" ||
        property.category === selectedCategory;

      return (
        matchesDestination &&
        matchesGuests &&
        matchesPrice &&
        matchesBedrooms &&
        matchesCategory
      );
    });
  }, [properties, searchFilters, selectedCategory]);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleReset = () => {
    setSearchFilters({ ...initialFilters });
    setSelectedCategory("All");
  };

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-hero-badge">
            YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Find your place
            <br />
            <span>away from home.</span>
          </h1>

          <p>
            Explore unique stays, discover new destinations,
            and find a space that fits your journey.
          </p>
        </div>
      </section>

      <div className="home-content">
        <SearchBar
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {loading ? (
          <p role="status">Loading properties...</p>
        ) : error ? (
          <div className="home-empty-state">
            <h3>Unable to load stays</h3>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            <section className="home-results">
              <div className="home-results-heading">
                <div>
                  <h2>Discover stays</h2>
                  <p>
                    {filteredProperties.length}{" "}
                    {filteredProperties.length === 1
                      ? "property"
                      : "properties"}{" "}
                    found
                  </p>
                </div>

                <button
                  type="button"
                  className="home-reset-button"
                  onClick={handleReset}
                >
                  Reset all
                </button>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="home-property-grid">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property._id || property.id}
                      property={property}
                    />
                  ))}
                </div>
              ) : (
                <div className="home-empty-state">
                  <div className="home-empty-icon" aria-hidden="true">
                    ⌕
                  </div>

                  <h3>No stays found</h3>

                  <p>
                    Try changing your destination, budget, guests,
                    bedrooms, or category.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import CategoryBar from "../components/CategoryBar";

function Home() {
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
  });

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/properties"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();

        const properties = Array.isArray(data)
          ? data
          : Array.isArray(data.properties)
            ? data.properties
            : [];

        setPropertyData(properties);
      } catch (error) {
        console.error("Properties loading error:", error);

        setError(
          "Unable to load properties. Please check whether the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  const filteredProperties = propertyData.filter(
    (property) => {
      const location = property.location || "";

      const destinationMatch =
        !searchData.destination ||
        location
          .toLowerCase()
          .includes(searchData.destination.toLowerCase());

      const guestsMatch =
        !searchData.guests ||
        (property.maxGuests || 0) >= Number(searchData.guests);

      const categoryMatch =
        selectedCategory === "All" ||
        property.category === selectedCategory;

      return (
        destinationMatch &&
        guestsMatch &&
        categoryMatch
      );
    }
  );

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            ✨ YOUR NEXT ADVENTURE STARTS HERE
          </span>

          <h1>
            Find your place
            <br />
            <span>in the world.</span>
          </h1>

          <p className="hero-description">
            Discover beautiful stays, explore new destinations,
            and make memories that last forever.
          </p>

          <div className="hero-search">
            <SearchBar onSearch={setSearchData} />
          </div>

          <div className="hero-highlights">
            <div className="hero-highlight">
              <span className="highlight-icon">🏡</span>
              <div>
                <strong>Unique stays</strong>
                <span>Find your perfect place</span>
              </div>
            </div>

            <div className="hero-highlight">
              <span className="highlight-icon">📍</span>
              <div>
                <strong>Amazing places</strong>
                <span>Explore new destinations</span>
              </div>
            </div>

            <div className="hero-highlight">
              <span className="highlight-icon">💖</span>
              <div>
                <strong>Made for you</strong>
                <span>Save your favourites</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-main">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=85"
              alt="Beautiful luxury vacation villa"
            />

            <div className="hero-image-overlay">
              <span className="hero-location-label">
                ✦ YOUR NEXT GETAWAY
              </span>

              <h2>Somewhere beautiful.</h2>

              <p>Your journey begins with a stay.</p>
            </div>
          </div>

          <div className="hero-floating-card">
            <span className="floating-card-icon">⭐</span>

            <div>
              <strong>Find your happy place</strong>
              <p>Discover stays worth remembering</p>
            </div>
          </div>

          <div className="hero-decoration hero-decoration-one"></div>
          <div className="hero-decoration hero-decoration-two"></div>
        </div>
      </section>

      <section className="explore-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              EXPLORE THE POSSIBILITIES
            </span>

            <h2>Find a stay that feels like you.</h2>

            <p>
              From relaxing beach escapes to peaceful mountain
              retreats, discover your next favourite place.
            </p>
          </div>
        </div>

        <CategoryBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="properties-heading">
          <div>
            <h2>
              {selectedCategory === "All"
                ? "Places you might love"
                : `${selectedCategory} stays`}
            </h2>

            {!loading && !error && (
              <p>
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1
                  ? "stay"
                  : "stays"}{" "}
                to explore
              </p>
            )}
          </div>

          {selectedCategory !== "All" && (
            <button
              type="button"
              className="clear-filter-button"
              onClick={() => setSelectedCategory("All")}
            >
              Clear filter ✕
            </button>
          )}
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>

            <h3>Finding beautiful places...</h3>

            <p>Your next favourite stay is just around the corner.</p>
          </div>
        )}

        {!loading && error && (
          <div className="error-container">
            <div className="state-icon">🏡</div>

            <h2>We couldn't load the stays</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProperties.length === 0 && (
            <div className="empty-container">
              <div className="state-icon">🔎</div>

              <h2>No stays found</h2>

              <p>
                Try another destination or select a different
                category to discover more places.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchData({
                    destination: "",
                    checkIn: "",
                    checkOut: "",
                    guests: 0,
                  });

                  setSelectedCategory("All");
                }}
              >
                Explore all stays
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          filteredProperties.length > 0 && (
            <section className="property-list">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id || property.id}
                  property={property}
                />
              ))}
            </section>
          )}
      </section>

      <section className="home-cta">
        <div className="home-cta-content">
          <span>YOUR NEXT CHAPTER STARTS HERE</span>

          <h2>
            The world is full of
            <br />
            places to fall in love with.
          </h2>

          <p>
            Find a stay that makes every journey special.
            Your next adventure is waiting.
          </p>

          <Link to="/register" className="home-cta-button">
            Start exploring <span>→</span>
          </Link>
        </div>

        <div className="home-cta-decoration">✦</div>
      </section>
    </main>
  );
}

export default Home;
import { useEffect, useState } from "react";

import {
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../services/propertyService";

import "./HostDashboard.css";

const initialForm = {
  location: "",
  price: "",
  maxGuests: "2",
  bedrooms: "1",
  bathrooms: "1",
  beds: "1",
  category: "Apartment",
  hostExperience: "",
  description: "",
  images: "",
  amenities: "",
};

function HostDashboard() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyProperties();

      setProperties(data.properties || []);
    } catch (err) {
      setError(
        err.message || "Unable to load your properties"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    setError("");
    setSuccess("");
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  const handleEdit = (property) => {
    setError("");
    setSuccess("");

    setEditingId(property._id);

    setForm({
      location: property.location || "",
      price: String(property.price ?? ""),
      maxGuests: String(property.maxGuests ?? 2),
      bedrooms: String(property.bedrooms ?? 1),
      bathrooms: String(property.bathrooms ?? 1),
      beds: String(property.beds ?? 1),
      category: property.category || "Apartment",
      hostExperience: property.hostExperience || "",
      description: property.description || "",
      images: Array.isArray(property.images)
        ? property.images.join(", ")
        : "",
      amenities: Array.isArray(property.amenities)
        ? property.amenities.join(", ")
        : "",
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const imageList = form.images
      .split(",")
      .map((image) => image.trim())
      .filter(Boolean);

    const amenityList = form.amenities
      .split(",")
      .map((amenity) => amenity.trim())
      .filter(Boolean);

    if (imageList.length === 0) {
      setError("Please provide at least one image URL.");
      return;
    }

    const propertyData = {
      location: form.location.trim(),
      price: Number(form.price),
      maxGuests: Number(form.maxGuests),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      beds: Number(form.beds),
      category: form.category,
      hostExperience: form.hostExperience.trim(),
      description: form.description.trim(),
      images: imageList,
      amenities: amenityList,
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateProperty(editingId, propertyData);

        setSuccess("Property updated successfully.");
      } else {
        await createProperty(propertyData);

        setSuccess("Property added successfully.");
      }

      resetForm();

      await fetchProperties();
    } catch (err) {
      setError(
        err.message || "Unable to save property"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await deleteProperty(propertyId);

      setProperties((previous) =>
        previous.filter(
          (property) => property._id !== propertyId
        )
      );

      setSuccess("Property deleted successfully.");
    } catch (err) {
      setError(
        err.message || "Unable to delete property"
      );
    }
  };

  if (loading) {
    return (
      <main className="host-dashboard">
        <p className="dashboard-status">
          Loading your dashboard...
        </p>
      </main>
    );
  }

  return (
    <main className="host-dashboard">
      <section className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            HOST CENTRE
          </p>

          <h1>Manage your properties</h1>

          <p className="dashboard-subtitle">
            Create listings and manage your existing stays.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="dashboard-add-button"
            onClick={handleAddClick}
          >
            + Add Property
          </button>
        )}
      </section>

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span className="dashboard-stat-label">
            Total Properties
          </span>

          <strong>{properties.length}</strong>
        </div>

        <div className="dashboard-stat-card">
          <span className="dashboard-stat-label">
            Average Nightly Price
          </span>

          <strong>
            ₹
            {properties.length
              ? Math.round(
                  properties.reduce(
                    (total, property) =>
                      total + Number(property.price || 0),
                    0
                  ) / properties.length
                ).toLocaleString("en-IN")
              : 0}
          </strong>
        </div>
      </section>

      {error && (
        <p className="dashboard-message dashboard-error" role="alert">
          {error}
        </p>
      )}

      {success && (
        <p className="dashboard-message dashboard-success" role="status">
          {success}
        </p>
      )}

      {showForm && (
        <section className="dashboard-form-section">
          <div className="dashboard-form-header">
            <div>
              <h2>
                {editingId
                  ? "Edit Property"
                  : "Add a New Property"}
              </h2>

              <p>
                Enter the details guests need to know.
              </p>
            </div>

            <button
              type="button"
              className="dashboard-cancel-button"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>

          <form
            className="property-form"
            onSubmit={handleSubmit}
          >
            <div className="property-form-grid">
              <div className="property-form-field">
                <label htmlFor="location">
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Goa, India"
                  required
                  maxLength={150}
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="price">
                  Price per night (₹)
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="category">
                  Property Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="Apartment">
                    Apartment
                  </option>

                  <option value="House">
                    House
                  </option>

                  <option value="Villa">
                    Villa
                  </option>

                  <option value="Cabin">
                    Cabin
                  </option>

                  <option value="Beachfront">
                    Beachfront
                  </option>

                  <option value="Room">
                    Room
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="property-form-field">
                <label htmlFor="maxGuests">
                  Maximum Guests
                </label>

                <input
                  id="maxGuests"
                  name="maxGuests"
                  type="number"
                  min="1"
                  value={form.maxGuests}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="bedrooms">
                  Bedrooms
                </label>

                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="bathrooms">
                  Bathrooms
                </label>

                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="beds">
                  Beds
                </label>

                <input
                  id="beds"
                  name="beds"
                  type="number"
                  min="1"
                  value={form.beds}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="property-form-field">
                <label htmlFor="hostExperience">
                  Host Experience
                </label>

                <input
                  id="hostExperience"
                  name="hostExperience"
                  value={form.hostExperience}
                  onChange={handleChange}
                  placeholder="e.g. Hosting since 2022"
                  required
                  maxLength={200}
                />
              </div>
            </div>

            <div className="property-form-field">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your property..."
                rows="4"
                maxLength={3000}
                required
              />
            </div>

            <div className="property-form-field">
              <label htmlFor="images">
                Image URLs
              </label>

              <textarea
                id="images"
                name="images"
                value={form.images}
                onChange={handleChange}
                placeholder="Paste image URLs separated by commas"
                rows="3"
                required
              />

              <small>
                Example: https://example.com/room.jpg
              </small>
            </div>

            <div className="property-form-field">
              <label htmlFor="amenities">
                Amenities
              </label>

              <textarea
                id="amenities"
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="Wi-Fi, Kitchen, Parking, AC"
                rows="2"
              />

              <small>
                Separate each amenity with a comma.
              </small>
            </div>

            <button
              type="submit"
              className="dashboard-save-button"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Property"
                  : "Create Property"}
            </button>
          </form>
        </section>
      )}

      <section className="dashboard-listings">
        <div className="dashboard-listings-heading">
          <h2>My Listings</h2>

          <span>
            {properties.length}{" "}
            {properties.length === 1
              ? "property"
              : "properties"}
          </span>
        </div>

        {properties.length === 0 ? (
          <div className="dashboard-empty">
            <div className="dashboard-empty-icon">
              🏡
            </div>

            <h3>No properties yet</h3>

            <p>
              Start hosting by adding your first property.
            </p>

            {!showForm && (
              <button
                type="button"
                className="dashboard-add-button"
                onClick={handleAddClick}
              >
                Add Your First Property
              </button>
            )}
          </div>
        ) : (
          <div className="dashboard-property-grid">
            {properties.map((property) => {
              const image =
                property.images?.[0] || "";

              return (
                <article
                  className="dashboard-property-card"
                  key={property._id}
                >
                  {image ? (
                    <img
                      src={image}
                      alt={property.location}
                      className="dashboard-property-image"
                    />
                  ) : (
                    <div className="dashboard-property-placeholder">
                      No image available
                    </div>
                  )}

                  <div className="dashboard-property-content">
                    <div className="dashboard-property-topline">
                      <span className="dashboard-category">
                        {property.category}
                      </span>

                      <span className="dashboard-rating">
                        ★{" "}
                        {Number(
                          property.rating || 0
                        ).toFixed(1)}
                      </span>
                    </div>

                    <h3>{property.location}</h3>

                    <p className="dashboard-property-description">
                      {property.description}
                    </p>

                    <p className="dashboard-property-meta">
                      {property.maxGuests} guests ·{" "}
                      {property.bedrooms} bedrooms ·{" "}
                      {property.beds} beds
                    </p>

                    <p className="dashboard-property-price">
                      ₹
                      {Number(
                        property.price || 0
                      ).toLocaleString("en-IN")}
                      <span> / night</span>
                    </p>

                    <div className="dashboard-card-actions">
                      <button
                        type="button"
                        className="dashboard-edit-button"
                        onClick={() => handleEdit(property)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="dashboard-delete-button"
                        onClick={() =>
                          handleDelete(property._id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default HostDashboard;
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const passwordStrength = Object.values(passwordChecks).filter(
    Boolean
  ).length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (passwordStrength < 5) {
      setError(
        "Please create a stronger password using all the requirements below."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create your account."
        );
      }

      setMessage(
        data.message || "Your account has been created successfully!"
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      setShowPassword(false);
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStrengthLabel = () => {
    if (!formData.password) return "Not entered";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 4) return "Almost there";
    return "Strong";
  };

  return (
    <main className="register-page">
      <section className="register-container">
        <div className="register-visual">
          <img
            className="register-visual-image"
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85"
            alt="Beautiful lake and mountains"
          />

          <div className="register-visual-overlay"></div>

          <Link to="/" className="register-brand">
            <span className="register-brand-icon">⌂</span>
            Stay<span>Scape</span>
          </Link>

          <div className="register-visual-content">
            <span className="register-visual-tag">
              YOUR JOURNEY STARTS HERE
            </span>

            <h1>
              Make room
              <br />
              for adventure.
            </h1>

            <p>
              Create your account and discover unique stays,
              unforgettable destinations, and your next
              favourite place.
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <span>✓</span>
                Discover unique places to stay
              </div>

              <div className="register-benefit">
                <span>✓</span>
                Save your favourite properties
              </div>

              <div className="register-benefit">
                <span>✓</span>
                Plan your next getaway
              </div>
            </div>
          </div>

          <div className="register-image-caption">
            <span>✧</span>
            Your next great memory is out there.
          </div>
        </div>

        <div className="register-form-section">
          <div className="register-form-wrapper">
            <div className="register-mobile-brand">
              <span className="register-brand-icon">⌂</span>
              Stay<span>Scape</span>
            </div>

            <div className="register-welcome">
              <span className="register-eyebrow">
                JOIN OUR COMMUNITY
              </span>

              <h2>Create your account</h2>

              <p>
                A few details, and you're ready to explore.
              </p>
            </div>

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >
              <div className="register-field">
                <label htmlFor="register-name">
                  Full name
                </label>

                <div className="register-input-wrapper">
                  <span className="register-input-icon">
                    ♙
                  </span>

                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="register-input-wrapper">
                  <span className="register-input-icon">
                    ✉
                  </span>

                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <div className="register-password-heading">
                  <label htmlFor="register-password">
                    Password
                  </label>

                  {formData.password && (
                    <span
                      className={`register-strength-label strength-${passwordStrength}`}
                    >
                      {getStrengthLabel()}
                    </span>
                  )}
                </div>

                <div className="register-input-wrapper">
                  <span className="register-input-icon">
                    ♧
                  </span>

                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div
                  className="register-strength-bars"
                  aria-label={`Password strength: ${getStrengthLabel()}`}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <span
                      key={level}
                      className={
                        level <= passwordStrength
                          ? `register-strength-bar active strength-${passwordStrength}`
                          : "register-strength-bar"
                      }
                    ></span>
                  ))}
                </div>

                <div className="register-password-rules">
                  <p className="register-rules-title">
                    Your password must contain:
                  </p>

                  <div className="register-rules-grid">
                    <span
                      className={
                        passwordChecks.length ? "rule-valid" : ""
                      }
                    >
                      {passwordChecks.length ? "✓" : "○"} 8+ characters
                    </span>

                    <span
                      className={
                        passwordChecks.uppercase ? "rule-valid" : ""
                      }
                    >
                      {passwordChecks.uppercase ? "✓" : "○"} Uppercase
                    </span>

                    <span
                      className={
                        passwordChecks.lowercase ? "rule-valid" : ""
                      }
                    >
                      {passwordChecks.lowercase ? "✓" : "○"} Lowercase
                    </span>

                    <span
                      className={
                        passwordChecks.number ? "rule-valid" : ""
                      }
                    >
                      {passwordChecks.number ? "✓" : "○"} Number
                    </span>

                    <span
                      className={
                        passwordChecks.special ? "rule-valid" : ""
                      }
                    >
                      {passwordChecks.special ? "✓" : "○"} Special character
                    </span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="register-feedback register-error" role="alert">
                  <span>!</span>
                  <p>{error}</p>
                </div>
              )}

              {message && (
                <div
                  className="register-feedback register-success"
                  role="status"
                >
                  <span>✓</span>
                  <p>{message}</p>
                </div>
              )}

              <button
                type="submit"
                className="register-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="register-button-spinner"></span>
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create my account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="register-divider">
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
            </div>

            <div className="register-login-prompt">
              <p>Already have an account?</p>

              <Link to="/login">
                Sign in <span>→</span>
              </Link>
            </div>

            <p className="register-terms">
              By creating an account, you agree to keep your
              login credentials secure.
            </p>

            <Link to="/" className="register-back-home">
              ← Back to explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
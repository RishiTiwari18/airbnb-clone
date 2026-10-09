import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim();

    if (!email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to log in. Please try again."
        );
      }

      if (!data.user || !data.token) {
        throw new Error("Invalid response from the server.");
      }

      login(data.user, data.token);
      navigate("/");
    } catch (error) {
      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-container">
        <div className="login-visual">
          <img
            className="login-visual-image"
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85"
            alt="Beautiful vacation villa"
          />

          <div className="login-visual-overlay"></div>

          <Link to="/" className="login-brand">
            <span className="login-brand-icon">⌂</span>
            Stay<span>Scape</span>
          </Link>

          <div className="login-visual-content">
            <span className="login-visual-tag">
              YOUR NEXT ADVENTURE AWAITS
            </span>

            <h1>
              The world is
              <br />
              waiting for you.
            </h1>

            <p>
              Discover extraordinary places, beautiful stays,
              and experiences worth remembering.
            </p>

            <div className="login-travel-note">
              <div className="login-travel-avatars">
                <span>✦</span>
                <span>♡</span>
                <span>⌂</span>
              </div>

              <span>Find a place that feels like home.</span>
            </div>
          </div>

          <div className="login-image-caption">
            <span>✧</span>
            Make every journey memorable.
          </div>
        </div>

        <div className="login-form-section">
          <div className="login-form-wrapper">
            <div className="login-mobile-brand">
              <span className="login-brand-icon">⌂</span>
              Stay<span>Scape</span>
            </div>

            <div className="login-welcome">
              <span className="login-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Pick up where your next adventure begins.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              <div className="login-field">
                <label htmlFor="login-email">
                  Email address
                </label>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    ✉
                  </span>

                  <input
                    id="login-email"
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

              <div className="login-field">
                <div className="login-password-heading">
                  <label htmlFor="login-password">
                    Password
                  </label>
                </div>

                <div className="login-input-wrapper">
                  <span className="login-input-icon">
                    ♙
                  </span>

                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
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
              </div>

              {error && (
                <div
                  className="login-error"
                  role="alert"
                >
                  <span>!</span>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="login-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-button-spinner"></span>
                    Signing you in...
                  </>
                ) : (
                  <>
                    Sign in to your account
                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            <div className="login-divider">
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
            </div>

            <div className="login-register-prompt">
              <p>New to StayScape?</p>

              <Link to="/register">
                Create an account <span>→</span>
              </Link>
            </div>

            <p className="login-terms">
              By continuing, you agree to use our platform
              responsibly and keep your account secure.
            </p>

            <Link to="/" className="login-back-home">
              ← Back to explore
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
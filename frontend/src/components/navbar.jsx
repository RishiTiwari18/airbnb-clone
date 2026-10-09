import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="navbar-logo-icon">⌂</span>

          <span>
            Stay<span className="navbar-logo-accent">Scape</span>
          </span>
        </Link>

        <button
          type="button"
          className="navbar-menu-toggle"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div
          className={`navbar-links ${
            menuOpen ? "navbar-links-open" : ""
          }`}
        >
          <Link
            to="/"
            className={`navbar-link ${
              isActive("/") ? "navbar-link-active" : ""
            }`}
            onClick={closeMenu}
          >
            Explore
          </Link>

          {!loading &&
            (user ? (
              <>
                <Link
                  to="/wishlist"
                  className={`navbar-link ${
                    isActive("/wishlist")
                      ? "navbar-link-active"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  <span className="navbar-heart">♡</span>{" "}
                  Wishlist
                </Link>

                <Link
                  to="/profile"
                  className={`navbar-link ${
                    isActive("/profile")
                      ? "navbar-link-active"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  Profile
                </Link>

                <div className="navbar-user">
                  <span className="navbar-avatar">
                    {(user.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>

                  <span className="navbar-username">
                    Hi, {(user.name || "User").split(" ")[0]}
                  </span>
                </div>

                <button
                  type="button"
                  className="navbar-button navbar-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="navbar-auth">
                <Link
                  to="/login"
                  className={`navbar-link ${
                    isActive("/login")
                      ? "navbar-link-active"
                      : ""
                  }`}
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="navbar-button navbar-register"
                  onClick={closeMenu}
                >
                  Get started <span>→</span>
                </Link>
              </div>
            ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
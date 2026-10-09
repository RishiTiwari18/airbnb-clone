import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Airbnb Clone
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>

        {!loading && (
          user ? (
            <>
              <Link to="/profile">Profile</Link>

              <span className="navbar-username">
                Hi, {user.name}
              </span>

              <button
                type="button"
                className="navbar-button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
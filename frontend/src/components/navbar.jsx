function Navbar() {
  return (
    <header className="navbar">

      {/* Logo */}
      <div className="logo">
        airbnb
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        <button>Homes</button>
        <button>Experiences</button>
        <button>Online Experiences</button>
      </nav>

      {/* Right side */}
      <div className="nav-right">
        <button>Airbnb your home</button>
        <button>🌐</button>
        <button>☰ 👤</button>
      </div>

    </header>
  );
}

export default Navbar;
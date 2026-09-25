function SearchBar() {
  return (
    <div className="search-bar">

      <div className="search-item">
        <span>Where</span>
        <p>Search destinations</p>
      </div>

      <div className="search-item">
        <span>Check in</span>
        <p>Add dates</p>
      </div>

      <div className="search-item">
        <span>Check out</span>
        <p>Add dates</p>
      </div>

      <div className="search-item">
        <span>Who</span>
        <p>Add guests</p>
      </div>

      <button className="search-button">
        🔍
      </button>

    </div>
  );
}

export default SearchBar;
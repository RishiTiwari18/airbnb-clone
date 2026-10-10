import "./CategoryBar.css";

function CategoryBar({
  categories = [],
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <section className="category-section">
      <div className="category-heading">
        <h2>Explore by category</h2>

        <p>Find a stay that matches your travel style.</p>
      </div>

      <div className="category-bar" aria-label="Property categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              className={`category-button ${
                isSelected ? "category-button-active" : ""
              }`}
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(category)}
            >
              {category === "All" ? "✦" : "⌂"}

              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryBar;
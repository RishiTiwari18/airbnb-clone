const categories = [
  "All",
  "Beach",
  "Mountain",
  "Heritage",
];

function CategoryBar({
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="category-bar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-button active"
              : "category-button"
          }
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryBar;
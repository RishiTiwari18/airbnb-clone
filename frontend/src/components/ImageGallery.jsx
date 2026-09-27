import { useState } from "react";

function ImageGallery({ images, location }) {
  const [selectedImage, setSelectedImage] =
    useState(0);

  return (
    <div className="image-gallery">

      <div className="main-image-container">
        <img
          src={images[selectedImage]}
          alt={location}
          className="main-gallery-image"
        />
      </div>

      <div className="thumbnail-container">

        {images.map((image, index) => (
          <button
            key={image}
            className={
              selectedImage === index
                ? "thumbnail active"
                : "thumbnail"
            }
            onClick={() =>
              setSelectedImage(index)
            }
          >
            <img
              src={image}
              alt={`${location} ${index + 1}`}
            />
          </button>
        ))}

      </div>

    </div>
  );
}

export default ImageGallery;
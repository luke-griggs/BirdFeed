import React, { useState } from "react";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = () => {
  // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Return the JSX for rendering 
  return (
    <div>
      {/* Header */}
     

      {/* Conditionally render the selected image if it exists */}
      {selectedImage && (
        <div>
          {/* Display the selected image */}
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br /> <br />
          {/* Button to remove the selected image */}
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}

      <br />

      {/* Input element to select an image file */}
      <div>
      <input
        id="file-upload"
        className="file-input"
        type="file"
        name="myImage"
        onChange={(event) => {
          const target = event.target;
          if (target instanceof HTMLInputElement && target.files) {
            setSelectedImage(target.files[0]);
          }
        }}
        style={{ display: 'none' }} // Hide the default file input
      />
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload Bird
      </label>
      {selectedImage && <p>Selected file: {selectedImage.name}</p>}
    </div>
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;
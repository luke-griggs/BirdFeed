import React, { ChangeEvent, useState } from "react";

// Define a functional component named UploadAndDisplayImage
const UploadAndDisplayImage = () => {
  // Define a state variable to store the selected image
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setBase64Image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    const response = await fetch("http://localhost:5000/api/analyze-image", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64Image }),
    });
    const data = await response.json();
    alert(data.description);
  };

  // Return the JSX for rendering
  return (
    <div>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        onChangeCapture={(event) => {
          const target = event.target;
          if (target instanceof HTMLInputElement && target.files) {
            setSelectedImage(target.files[0]);
          }
        }}
        style={{ display: "none" }}
      />
      <label htmlFor="file-upload" className="custom-file-upload">
        Upload Bird
      </label>
      {selectedImage && (
        <div>
          <img
            alt="Uploaded"
            width="250px"
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <div className="flex flex-col space-y-2">
            <button onClick={() => setSelectedImage(null)}>Remove</button>
            <button onClick={handleImageUpload}>Analyze Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Export the UploadAndDisplayImage component as default
export default UploadAndDisplayImage;

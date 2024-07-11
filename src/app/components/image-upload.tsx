"use client"

import React, { ChangeEvent, useRef, useState } from "react";

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";  // Clear the file input
    }
  };

  return (
    <div>
      <input
        id="file-upload"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
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
            <button onClick={handleRemoveImage}>Remove</button>
            {/* handleImageUpload logic should go here */}
            <button onClick={() => {}}>Analyze Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadAndDisplayImage;
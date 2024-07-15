"use client"

import React, { ChangeEvent, useRef, useState } from 'react';
import { trpc } from '@/app/utils/trpc';

// Define the component
const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Proper placement of useMutation inside the component
  const createPresignedUrlMutation = trpc.bird.createPresignedUrl.useMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
  };

  async function uploadFileToS3({
    getPresignedUrl,
    selectedImage,
  }: {
    getPresignedUrl: () => Promise<{
      url: string;
      fields: Record<string, string>;
    }>;
    selectedImage: File;
  }) {
    const { url, fields } = await getPresignedUrl();
    const formData = new FormData();
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }
    formData.append('file', selectedImage); // Correctly append the file

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    return response;
  }

  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) return;
    const res = await uploadFileToS3({
      getPresignedUrl: () => createPresignedUrlMutation.mutateAsync(),
      selectedImage,
    });
    setSelectedImage(null); // Clear the selected image after uploading

    console.log('Upload response:', res);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUploadImage}>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" className="custom-file-upload cursor-pointer text-blue-500">
          Upload Bird
        </label>
        {selectedImage && (
          <div className="mt-4">
            <img
              alt="Uploaded"
              width="250px"
              src={URL.createObjectURL(selectedImage)}
              className="mb-4"
            />
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
              <button type="submit" className="bg-green-500 text-white p-2 rounded">
                Analyze Image
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadAndDisplayImage;

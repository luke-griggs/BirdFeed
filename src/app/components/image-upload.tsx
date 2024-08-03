"use client";

import React, { ChangeEvent, useRef, useState, useEffect } from "react";
import { trpc } from "@/app/utils/trpc";
import BirdCard from "./bird-card";
import toast, { Toaster } from "react-hot-toast";
import { resizeImage } from "../api/image_resizer";
import Dialog from "@/app/components/ui/dialog";
import { HiX } from "react-icons/hi";

const UploadAndDisplayImage = () => {
  interface BirdCardData {
    info: {
      name: string;
      description: string;
    }
    image_url: string;
  }

  const [birdCardData, setBirdCardData] = useState<BirdCardData>();
  const [selectedImage, setSelectedImage] = useState<Blob | File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createPresignedUrlMutation = trpc.bird.createPresignedUrl.useMutation();
  const birdDescription = trpc.bird.birdDescription.useMutation();
  const addBirdToNest = trpc.bird.addBirdToNest.useMutation();

 
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {

    setBirdCardData(undefined);

    const file = event.target.files && event.target.files[0];
    if (file){
      resizeImage(file, 768, 2000, (resizedBlob) => {
        setSelectedImage(resizedBlob);
      })
    }

  };

  const handleAddToNest = async () => {
    
    const res = await addBirdToNest.mutateAsync({ image_url: birdCardData!.image_url, name: birdCardData!.info.name, description: birdCardData!.info.description });

    if (res.success) {
      toast.success("Bird added to your nest");
    } else {
      toast.error("Failed to add bird to your nest");
    }
    
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
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
    selectedImage: Blob | File;
  }) {
    const { url, fields } = await getPresignedUrl();
    const formData = new FormData();

    for (const name in fields) {
      formData.append(name, fields[name]);
    }

    formData.append("file", selectedImage);

    const AwsResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const birdNameAndDescription = await birdDescription.mutateAsync({
      image_url: `${url}/${fields.key}`,
    }); 

    return { AwsResponse, birdNameAndDescription, url:`${url}/${fields.key}` };
  }

  const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedImage) return;

    const res = await uploadFileToS3({
      getPresignedUrl: () => createPresignedUrlMutation.mutateAsync(),
      selectedImage,
    });

    setSelectedImage(null); // Clear the selected image after uploading
    setBirdCardData({
      info: res.birdNameAndDescription,
      image_url: res.url
  });

    console.log("Upload response:", res.AwsResponse);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUploadImage}>
        <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label
          htmlFor="file-upload"
          className="custom-file-upload cursor-pointer text-blue-500"
        >
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
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                What bird am I?
              </button>
            </div>
          </div>
        )}
      </form>
      {birdCardData && (
        <Dialog>
        <div className="w-1/2">
          <div>
            <img src={birdCardData.image_url} alt="" />
            <h1 className="text-2xl font-medium pb-4">
              congratulations! you spotted a {birdCardData.info.name}
            </h1>
            <p className="text-sm text-gray-300">{birdCardData.info.description}</p>
          </div>
        </div>
        <div className="flex-row space-x-3">
          <button className="w-sm bg-blue-500 text-white rounded-md" onClick={() => {handleAddToNest(), setBirdCardData(undefined)}}> {/* need to close and toast after this */}
          <h1 className="p-2">
            Add to my Nest
            </h1>        
            </button>

            <input
          id="file-upload"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
            <label
          htmlFor="file-upload"
          className="custom-file-upload cursor-pointer p-1.5"
          // onClick={() => setBirdCardData(undefined)}
        >
          Scan another bird
        </label>
          <button className="absolute right-4 top-4" onClick={() => setBirdCardData(undefined)}>
            <HiX className="h-4 w-4" />
          </button>
        </div>
      </Dialog>
        
      )}
      <Toaster />
    </div>
  );
};

export default UploadAndDisplayImage;

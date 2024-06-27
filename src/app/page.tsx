"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import { motion } from "framer-motion";
import React from "react";
import ImagesSliderParent from "./components/images-slider-parent";
import UploadAndDisplayImage from "./components/image-upload";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  
  return (
    <main>
      <Navbar />
      <div className="bg-[#FFF5E5] min-h-screen">
        <main className="flex flex-col md:flex-row items-center p-8">
          <div className="md:w-1/2 text-[#156E93] space-y-4 p-10">
            <h1 className="text-4xl font-bold">Identify Birds in seconds</h1>
            <p className="text-lg">
              Identify and learn about the birds you spot in the wild with
              Birdfeed's simple AI-powered bird identification tool
            </p>
            <button className="bg-[#156E93] text-white px-4 py-2 rounded-full">
              identify now!
            </button>
            <p>Buy now, pay later with Affirm</p>

            <div className="flex space-x-2">
              {/* Example user avatars */}

              <div className="rounded-full bg-gray-300 text-center flex items-center justify-center w-8 h-8">
                +
              </div>
            </div>
            <p>234,556 users feeding birds with Bird Buddy</p>
            <UploadAndDisplayImage />
          </div>
          <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
            <ImagesSliderParent />
          </div>
        </main>
      </div>
    </main>
  );
}

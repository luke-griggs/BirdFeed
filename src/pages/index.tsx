
import Image from "next/image";
import Navbar from "../app/components/navbar";
import { motion } from "framer-motion";
import React from "react";
import ImagesSliderParent from "../app/components/images-slider-parent";
import { trpc } from "../app/utils/trpc";


const Home = () => {
  const {data: session} = trpc.auth.readUserSession.useQuery();
  return (
    <main>
      <Navbar session={session?.user}/>
      <div className="bg-[#FFF5E5] min-h-screen">
        <main className="flex flex-col md:flex-row items-center p-8">
          <div className="md:w-1/2 text-[#156E93] space-y-4 p-10">
            <h1 className="text-4xl font-bold">Identify Birds in seconds</h1>
            <p className="text-lg">
              Identify and learn about the birds you spot in the wild with
              Birdfeeds simple AI-powered bird identification tool
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
          </div>
          <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
            <ImagesSliderParent />
          </div>
        </main>
      </div>
    </main>
  );
}
export default Home

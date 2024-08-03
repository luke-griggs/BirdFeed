import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "@/app/utils/trpc";
import Navbar from "@/app/components/navbar";
import UploadAndDisplayImage from "@/app/components/image-upload";

const Page = () => {
  const router = useRouter();
  const { data: session, isLoading } = trpc.auth.readUserSession.useQuery();

  useEffect(() => {
    if (!isLoading && !session) {
      router.replace('/login');  // Use replace to navigate without adding the current page to the history stack
    }
  }, [session, isLoading, router]);

  if (!session) {
    return null;  // Render nothing while checking the session or if there is no session
  }

  return (
    <>
      <Navbar session={session?.user}/>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Welcome to Your Birdfeed Profile</h1>
            <div className="flex w-1/4 space-x-2">
              <a href="/nest" className="w-full h-auto outline rounded-md text-center">
                <button>My nest</button>
              </a>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <UploadAndDisplayImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
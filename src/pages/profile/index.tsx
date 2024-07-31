import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "@/app/lib/auth";
import { lucia, validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { NextApiRequest } from "next";
import { trpc } from "@/app/utils/trpc";
import { LogoutButton } from "@/app/lib/helpers/logout";
import UploadAndDisplayImage from "@/app/components/image-upload";

//secure this page
export default function Page() {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Welcome to Your Birdfeed Profile</h1>
          <div className="flex w-1/4 space-x-2">
          <LogoutButton />
          <a href="/nest/page" className="w-full h-auto outline rounded-md text-center">
          <button className="">
            My nest
          </button>
          </a>
          </div>
          
        </div>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <UploadAndDisplayImage />
        </div>
      </div>
    </div>
  );

  // async function logout(): Promise<ActionResult> {
  //   "use server";

  //   const Session = await getSession(req as any)
  //   const { session } = await validateRequest();
  //   if (!session) {
  //     return {
  //       error: "not logged in",
  //     };
  //   }
  //   await lucia.invalidateSession(session.id);

  //   const sessionCookie = lucia.createBlankSessionCookie();
  //   cookies().set(
  //     sessionCookie.name,
  //     sessionCookie.value,
  //     sessionCookie.attributes
  //   );
  //   return redirect("/login");
  // }

  interface ActionResult {
    error: string | null;
  }
}

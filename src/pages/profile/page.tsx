import React from "react";
import { lucia, validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  // const { user } = await validateRequest();
  // if (!user) {
  //   //set up login page
  //   redirect("/login");
  // }

  return (
    <div>
       Hi, welcome to your birdfeed profile 
      {/* <form action={logout}></form> */}
    </div>
  );

  // async function logout(): Promise<ActionResult> {
  //   "use server";
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

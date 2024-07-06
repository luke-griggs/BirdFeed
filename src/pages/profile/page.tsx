import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "@/app/lib/auth";
import { lucia, validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { NextApiRequest } from "next";
import { trpc } from "@/app/utils/trpc";
import { LogoutButton } from "@/app/lib/helpers/logout";

export default function Page() {
  const session = trpc.auth.readUserSession.useQuery();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div>Hi, welcome to your birdfeed profile</div>
      <LogoutButton />
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

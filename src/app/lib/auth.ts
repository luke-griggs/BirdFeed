import { Lucia } from "lucia";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { cookies } from "next/headers";
import { cache } from "react";
import { Google } from "arctic";
import { NextApiRequest, NextApiResponse } from "next";
import type { Session, User } from "lucia";
import { z } from "zod";
import cookie from "cookie"
//set up zod schema

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {};
  },
});

export const validateRequest = async (req: NextApiRequest): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {

  if (!req || !req.headers){
    throw new Error("Request object or headers are missing")
  }

  const Cookies = cookie.parse(req.headers.cookie || "");
  const sessionId = Cookies[lucia.sessionCookieName];
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  console.log("result", result)
  return result;
};


//validate request but doesn't refresh the cookie
export const getSession = async (req: NextApiRequest): Promise<
  { user: User; session: Session } | { user: null; session: null }
> => {

  if (!req || !req.headers){
    throw new Error("Request object or headers are missing")
  }

  const Cookies = cookie.parse(req.headers.cookie || "");
  const sessionId = Cookies[lucia.sessionCookieName];
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  
  console.log("result", result)
  return result;
};



// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  "http://localhost:3000/login/google/callback"
);

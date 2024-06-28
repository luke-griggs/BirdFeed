import { google, lucia } from "@/app/lib/auth";
import { DatabaseUser, db } from "@/app/lib/db";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";


export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const codeVerifier = url.searchParams.get("code_verifier")
	const storedState = cookies().get("google")?.value ?? null;
	if (!code || !codeVerifier || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: GoogleUser = await githubUserResponse.json();
		const existingUser = db.prepare("SELECT * FROM user WHERE github_id = ?").get(googleUser.id) as // TODO set up trpc router for this
			| DatabaseUser
			| undefined;

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/pages/profile"
				}
			});
		}

		const userId = generateId(15);
		db.prepare("INSERT INTO user (id, github_id, username) VALUES (?, ?, ?)").run( // TODO set up trpc router for this
			userId,
			googleUser.id,
			googleUser.login
		);
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/pages/profile"
			}
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError && e.message === "bad_verification_code") {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

interface GoogleUser {
	id: string;
	login: string;
}



/* 
After the user logs in to Google and authorizes the application, Google redirects them back to your application with an authorization code. This file handles that callback:

	1.	Extract Query Parameters: It retrieves the code, state, and code_verifier from the URL.
	2.	Verify State: It checks if the state parameter matches the state stored in the cookies. This is crucial to ensure that the response is to a request made by the same user and not a result of a CSRF attack.
	3.	Validate Authorization Code: Using the code and code_verifier, it calls google.validateAuthorizationCode to exchange the authorization code for an access token.
	4.	Fetch User Information: It then uses the access token to fetch the user’s information from Google’s API.
	5.	Database Interaction: Depending on whether the user is already in the database, it either creates a new session for an existing user or inserts a new user into the database and then creates a session.
	6.	Set Session Cookie: A session cookie is set for the authenticated user, and they are redirected to the homepage.
	7.	Error Handling: The code includes error handling for issues like an invalid verification code or other OAuth2 request errors.

*/
import { google, lucia } from "@/app/lib/auth";
import { DatabaseUser, db } from "@/app/lib/db";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { trpc, trpcClient} from "@/app/utils/trpc"

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

    const storedCodeVerifier = cookies().get("code_verifier")?.value
	const storedState = cookies().get("state")?.value ?? null;
	if (!code || !storedCodeVerifier || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	

	try {
		const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
		console.log("second work")
		const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const googleUser: GoogleUser = await response.json();
		console.log("googleUser", googleUser)

		const existingUser = await trpcClient.auth.getUser.query({ googleUserId: googleUser.sub }); //sub is just the id (stands for subject, it's just what google calls it)
		console.log("fourth work")
		if (existingUser) {
			//TODO: make sure session doesn't exist, if it does reroute to profile
				const activeSessionCheck = await trpcClient.auth.verifySession.query({userId: existingUser.id});

				if (activeSessionCheck) {
					console.log("session found")
					return new Response(null, {
						status: 302,
						headers: {
							Location: "/profile"
						}
					});
				}
				
				console.log("session not found, creating new session and rerouting to profile page")
				const newSession = await lucia.createSession(existingUser.id, {});
				console.log("session created")
				const sessionCookie = lucia.createSessionCookie(newSession.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
				console.log("cookie set")
				return new Response(null, {
					status: 302,
					headers: {
						Location: "/profile"
					}
				});

			} 
		else {

		const userId = generateId(15);
		
		try {
			
			const newUser = await trpcClient.auth.addUser.mutate({
				id: userId,
				googleUserId: googleUser.sub,
				email: googleUser.email,
				name: googleUser.name
			});
			console.log("User added successfully");
		} catch (error) {
			console.error("Error adding user:", error);
			// Handle error appropriately
		}

		//TODO: add error checking here

		console.log("creating session for brand new user")
		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/profile/page"
			}
		});
	 }

	} catch (e) {
		
		if (e instanceof OAuth2RequestError) {
			const { request, message, description } = e;
			console.log(e.request)
			console.log(e.message)
			console.log(e.description)
			console.log("OAuth error")
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
	email: string;
	name: string;
	sub: string;
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
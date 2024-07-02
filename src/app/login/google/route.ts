import { generateCodeVerifier, generateState } from "arctic"
import { google } from "../../lib/auth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
	const state = generateState();
    const codeVerifier = generateCodeVerifier()
	const url = await google.createAuthorizationURL( state, codeVerifier, {scopes: ['openid', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']});

	cookies().set("state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

    cookies().set("code_verifier", codeVerifier, {
        secure: true,
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,

    })

	return Response.redirect(url);
}

/* This file sets up the initial part of the OAuth2 authentication process:

 	1.	Generate State and Code Verifier: These are cryptographic tokens used to prevent CSRF (Cross-Site Request Forgery) attacks. generateState generates a random string to maintain state between the request and callback, ensuring that the response corresponds to the request made by the user. generateCodeVerifier is used for PKCE (Proof Key for Code Exchange) to enhance the security of OAuth exchanges.
	2.	Create Authorization URL: This function call generates the URL to which the user will be redirected to authorize the application using their Google account. This URL includes the state and code_verifier as query parameters.
 	3.	Set Cookies: It stores the state and code_verifier in cookies to retrieve them later for verification. The settings ensure that these cookies are secure and only sent over HTTPS if in production.
	4.	Redirect to Authorization URL: Finally, it redirects the user’s browser to the Google authorization URL where they can log in and approve the application’s request to access their account.

*/
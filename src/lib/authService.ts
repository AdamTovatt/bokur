import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client } from '@auth0/auth0-spa-js';
import { user, isAuthenticated, popupOpen, token } from '$lib/store';

let client: Auth0Client | null = null;

async function createClient(): Promise<Auth0Client> {
	const auth0Client = await createAuth0Client({
		domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
		clientId: import.meta.env.VITE_APP_CLIENT_ID as string,
		authorizationParams: {
			audience: import.meta.env.VITE_AUTH0_AUDIENCE as string
		}
	});
	return auth0Client;
}

async function login(): Promise<void> {
	if (!client) {
		client = await createClient();
	}
	popupOpen.set(true);
	try {
		await client.loginWithPopup({
			authorizationParams: {
				redirect_uri: window.location.origin
			}
		});
		const userDetails = await client.getUser();
		if (userDetails) {
			user.set(userDetails);
			token.set(
				await client.getTokenSilently({
					authorizationParams: {
						audience: import.meta.env.VITE_AUTH0_AUDIENCE as string
					}
				})
			);
			isAuthenticated.set(true);
		}
	} catch (e) {
		console.error(e);
	} finally {
		popupOpen.set(false);
	}
}

async function logout(): Promise<void> {
	if (!client) {
		client = await createClient();
	}
	return client.logout({ logoutParams: { returnTo: window.location.origin } });
}

const auth = {
	createClient,
	login,
	logout
};

export default auth;

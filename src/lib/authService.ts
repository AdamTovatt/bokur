import { createAuth0Client } from '@auth0/auth0-spa-js';
import type { Auth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js';
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

async function loginWithPop(options?: PopupLoginOptions): Promise<void> {
	if (!client) {
		client = await createClient();
	}
	popupOpen.set(true);
	try {
		await client.loginWithPopup(options);
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
	return client.logout();
}

const auth = {
	createClient,
	loginWithPop,
	logout
};

export default auth;

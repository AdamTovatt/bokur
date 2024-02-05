import { writable } from 'svelte/store';

import type { Auth0Client, User } from '@auth0/auth0-spa-js';

export const isAuthenticated = writable(false);
export const user = writable({} as User);
export const token = writable('');
export const popupOpen = writable(false);
export const error = writable('');
export const loging = writable(false);
export const auth0Client = writable({} as Auth0Client);

export const pageTitle = writable('');

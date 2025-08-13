<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { pageTitle } from '$lib/store';

	import { isAuthenticated, user, auth0Client, token } from '$lib/store';
	import Taskbar from '../components/Taskbar.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';

	import Login from '../components/Login.svelte';
	onMount(async () => {
		$auth0Client = await auth.createClient();
		
		// Check if this is a redirect callback from Auth0
		if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
			await auth.handleRedirectCallback();
			// Clean up the URL after handling callback
			window.history.replaceState({}, document.title, window.location.pathname);
		} else {
			// Normal app initialization
			isAuthenticated.set(await $auth0Client.isAuthenticated());
			user.set(await $auth0Client.getUser());
			if (await $auth0Client.isAuthenticated()) {
				token.set(
					await $auth0Client.getTokenSilently({
						authorizationParams: {
							audience: import.meta.env.VITE_AUTH0_AUDIENCE
						}
					})
				);
			}
		}
	});
</script>

<title>{$pageTitle} | Bokur</title>

<Taskbar />
<PageContentContainer margin={2}>
	<div
		style="display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 100vh;
	padding-top: 5rem;"
		class="lg:padding-top-6"
	>
		{#if $isAuthenticated}
			<slot />
		{:else}
			<Login />
		{/if}
	</div>
</PageContentContainer>

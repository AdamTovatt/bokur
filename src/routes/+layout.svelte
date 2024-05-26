<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { pageTitle } from '$lib/store';

	import { isAuthenticated, user, auth0Client, token } from '$lib/store';
	import Taskbar from '../components/Taskbar.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';
	import Login from '../components/Login.svelte';
	onMount(async () => {
		$auth0Client = await auth.createClient();
		isAuthenticated.set(await $auth0Client.isAuthenticated());
		user.set(await $auth0Client.getUser());
		token.set(
			await $auth0Client.getTokenSilently({
				authorizationParams: {
					audience: import.meta.env.VITE_AUTH0_AUDIENCE
				}
			})
		);
	});
</script>

<title>{$pageTitle} | Bokur</title>

<Taskbar />
<PageContentContainer>
	<div
		style="		display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	min-height: 100vh;"
	>
		{#if $isAuthenticated}
			<slot />
		{:else}
			<Login />
		{/if}
	</div>
</PageContentContainer>

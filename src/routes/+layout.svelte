<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { pageTitle } from '$lib/store';

	import { isAuthenticated, user, auth0Client, token } from '$lib/store';
	import Taskbar from '../components/Taskbar.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';
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
	<MaxWidthContainer maxWidth={30}>
		<slot />
	</MaxWidthContainer>
</PageContentContainer>

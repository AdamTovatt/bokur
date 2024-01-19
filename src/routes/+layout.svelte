<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import auth from '$lib/authService';
	import { isAuthenticated, user, auth0Client, token } from '$lib/store';
	onMount(async () => {
		$auth0Client = await auth.createClient();
		isAuthenticated.set(await $auth0Client.isAuthenticated());
		user.set(await $auth0Client.getUser());
		token.set(await $auth0Client.getTokenSilently());
	});
</script>

<slot />

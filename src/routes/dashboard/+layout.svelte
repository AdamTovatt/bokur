<script lang="ts">
	import { isAuthenticated } from '$lib/store';
	import { onMount } from 'svelte';
	import { routeToPage } from '../../functions/routing';

	onMount(() => {
		if (!$isAuthenticated) {
			routeToPage('', false);
		}
	});
</script>

<div>
	{#if $isAuthenticated}
		<slot />
	{/if}
</div>

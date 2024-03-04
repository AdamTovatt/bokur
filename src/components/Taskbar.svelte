<script lang="ts">
	import { Color } from '../constants';
	import Icon from '$lib/images/book.svelte';
	import HamburgerIcon from '../icons/HamburgerIcon.svelte';
	import { pageTitle } from '$lib/store';
	import { routeToPage } from '../functions/routing';
</script>

<div
	class="taskbar flex items-center justify-between w-full fixed bottom-0 left-0 p-2 z-10"
	style="background-color: {Color.Depth2}"
>
	<button
		on:click={() => {
			routeToPage('');
		}}
	>
		<svelte:component this={Icon} />
	</button>
	<span class="text-white" style="color: ${Color.White};">{$pageTitle}</span>
	<HamburgerIcon />
</div>

<style>
	:global(svg) {
		width: 3rem;
		display: block;
	}
</style>

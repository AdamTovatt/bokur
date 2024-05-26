<script lang="ts">
	import { Color } from '../constants';
	import Icon from '$lib/images/book.svelte';
	import HamburgerIcon from '../icons/HamburgerIcon.svelte';
	import { pageTitle } from '$lib/store';
	import { routeToPage } from '../functions/routing';

	let menuOpen: boolean = false;
</script>

{#if menuOpen}
	<button
		style="
		min-height: 100%;
		min-width: 100vw;
		background-color: black;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		justify-items: flex-end;
		align-content: flex-end;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 20"
		on:click={() => {
			menuOpen = false;
		}}
	>
		<div>
			<div style="display: flex; justify-content: flex-end; background-color: red;">
				<button on:click={() => {}}
					><div style="background-color: red; max-width: 5rem">hej</div></button
				>
			</div>
		</div>
	</button>
{/if}

<div
	class="taskbar flex items-center justify-between w-full fixed bottom-0 left-0 p-2 z-10"
	style="background-color: {Color.Depth2}; z-index: 10"
>
	<button
		on:click={() => {
			routeToPage('');
		}}
	>
		<svelte:component this={Icon} />
	</button>
	<span class="text-white" style="color: ${Color.White};">{$pageTitle}</span>
	<button
		on:click={() => {
			menuOpen = true;
		}}
	>
		<HamburgerIcon />
	</button>
</div>

<style>
	:global(svg) {
		width: 3rem;
		display: block;
	}
</style>

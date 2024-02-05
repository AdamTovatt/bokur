<script lang="ts">
	import { Color } from '../constants';
	import Icon from '$lib/images/book.svelte';
	import HamburgerIcon from '../icons/HamburgerIcon.svelte';
	import { pageTitle } from '$lib/store';
</script>

<div
	class="taskbar flex items-center justify-between w-full fixed bottom-0 left-0 p-2"
	style="background-color: {Color.Depth2}"
>
	<svelte:component this={Icon} />
	<span class="text-white">{$pageTitle}</span>
	<HamburgerIcon />
</div>

<style>
	:global(svg) {
		width: 3rem;
		display: block;
	}
</style>

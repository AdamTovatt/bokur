<script lang="ts">
	import { Color } from '../constants';
	import Icon from '$lib/images/book.svelte';
</script>

<div class="taskbar" style="background-color: {Color.Depth2}"><svelte:component this={Icon} /></div>

<style>
	.taskbar {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4rem;
		background-color: #fff;
		box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.25);
	}
	:global(svg) {
		width: 3rem;
		display: block;
	}
</style>

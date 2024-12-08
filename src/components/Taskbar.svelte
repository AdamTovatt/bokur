<script lang="ts">
	import { Color, BorderRadius } from '../constants';
	import Icon from '$lib/images/book.svelte';
	import HamburgerIcon from '../icons/HamburgerIcon.svelte';
	import { pageTitle } from '$lib/store';
	import { routeToPage } from '../functions/routing';
	import { exportData } from '$lib/api';
	import BokurButton from './BokurButton.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	let menuOpen: boolean = false;

	async function handleExport() {
		try {
			await exportData();
		} catch (error) {
			console.error('Export failed:', error);
		}
	}
</script>

{#if menuOpen}
	<button
		style="
		min-height: 100vh;
		min-width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		justify-items: flex-end;
		align-content: flex-end;
		position: fixed;
		right: 0;
		bottom: 0;
		z-index: 20;
		cursor: default;"
		on:click={() => {
			menuOpen = false;
		}}
	>
		<div style="display: flex; justify-content: flex-end;">
			<div
				style="background-color: {Color.Depth3}; width: 10rem; padding: 1rem; border-radius: {BorderRadius.Default}; 
				box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);"
			>
				<BokurButton
					backgroundColor={Color.Depth4}
					onClick={() => {
						routeToPage('transactions');
					}}>Transactions</BokurButton
				>
				<VerticalSpacing height={1} />
				<BokurButton
					backgroundColor={Color.Depth4}
					onClick={() => {
						routeToPage('invoice');
					}}>Invoice</BokurButton
				>
				<VerticalSpacing height={1} />
				<BokurButton backgroundColor={Color.Depth4} onClick={handleExport}>Export</BokurButton>
			</div>
		</div>
		<VerticalSpacing height={4} />
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

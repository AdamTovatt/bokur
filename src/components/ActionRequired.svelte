<script lang="ts">
	import { getAllThatRequiresAction } from '$lib/api';
	import { token } from '$lib/store';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import BokurButton from './BokurButton.svelte';

	export let transactions: import('$lib/types').Transaction[] = [];
</script>

{#if transactions.length > 0}
	<div
		style={`background-color: ${Color.Depth3};`}
		class="flex flex-col rounded-lg items-center p-6 mt-auto"
	>
		<p class="text-xl text-white font-light">Action required!</p>
		<p class="text-white text-md font-light mt-4 mb-4">
			{transactions.length} transactions are missing data
		</p>
		<BokurButton
			hasBorder
			backgroundColor={Color.Depth4}
			onClick={() => {
				routeToPage('transactions');
			}}>Go to transactions</BokurButton
		>
	</div>
{/if}

<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import Plupp from './Plupp.svelte';

	export let transaction: Transaction;
</script>

<div
	class="flex flex-row p-3 rounded-2xl items-center relative"
	style={`background-color: ${Color.Depth4}; font-size: 0.8rem; color: ${Color.White}`}
>
	<button
		class="flex flex-col"
		style="width: 98%;"
		on:click={() => {
			routeToPage('transaction?id=' + transaction.id);
		}}
	>
		<div style="display: flex; justify-content: space-between;">
			<p style="max-width: 60%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
				{transaction.name}
			</p>
			<p>{transaction.value} kr</p>
		</div>
		<div style="display: flex; justify-content: space-between;">
			<p>
				{#if transaction.affectedAccount}
					{transaction.affectedAccount}
				{:else}
					(missing account)
				{/if}
			</p>
			<p></p>
			<p>{new Date(transaction.date).toLocaleDateString('sv-SE')}</p>
		</div>
	</button>
	<Plupp value={transaction.value} />
</div>

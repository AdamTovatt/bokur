<script lang="ts">
	import type { Account, Transaction } from '$lib/types';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import Plupp from './Plupp.svelte';

	let forceExpand: boolean = false;
	export let transaction: Transaction; // Input property for transaction
</script>

<button
	class="flex flex-row p-3 rounded-2xl items-center relative"
	style={`background-color: ${transaction.ignored ? Color.Depth3 : Color.Depth4}; font-size: 0.8rem; color: ${Color.White}; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);`}
	on:click={() => {
		if (!transaction.ignored || forceExpand) routeToPage('transaction?id=' + transaction.id);
		forceExpand = true;
	}}
>
	{#if !transaction.ignored || forceExpand}
		<div class="flex flex-col" style="width: 98%;">
			<div style="display: flex; justify-content: space-between;">
				<p style="max-width: 60%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
					{transaction.name}
				</p>
				<p>{transaction.value} kr</p>
			</div>
			<div style="display: flex; justify-content: space-between;">
				<p>
					{#if transaction.affectedAccount}
						{transaction.affectedAccount.name}
					{:else}
						(missing account)
					{/if}
				</p>
				<p>{new Date(transaction.date).toLocaleDateString('sv-SE')}</p>
			</div>
		</div>
		<Plupp value={transaction.value} />
	{/if}
</button>

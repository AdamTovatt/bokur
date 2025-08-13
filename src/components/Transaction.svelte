<script lang="ts">
	import { formatMoney } from '$lib/functions';
	import type { Transaction } from '$lib/types';
	import { Color } from '../constants';
	import Plupp from './Plupp.svelte';
	import QuickFileUpload from './QuickFileUpload.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let forceExpand: boolean = false;
	export let transaction: Transaction; // Input property for transaction
	
	$: isClickable = !transaction.ignored || forceExpand;
	$: href = isClickable ? `/transaction?id=${transaction.id}` : '#';
	$: needsFile = !transaction.associatedFileName;

	function handleClick(event: MouseEvent) {
		if (transaction.ignored && !forceExpand) {
			event.preventDefault();
			forceExpand = true;
		}
	}

	function handleFileUploaded(event: CustomEvent) {
		dispatch('fileUploaded', event.detail);
	}
</script>

<div
	class="flex flex-row p-3 rounded-2xl items-center relative"
	style={`background-color: ${transaction.ignored ? Color.Depth3 : Color.Depth4}; font-size: 0.8rem; color: ${Color.White}; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);`}
>
	{#if !transaction.ignored || forceExpand}
		<a
			{href}
			class="flex flex-col no-underline flex-1"
			style={`color: ${Color.White}; text-decoration: none; cursor: ${isClickable ? 'pointer' : 'default'};`}
			on:click={handleClick}
		>
			<div style="display: flex; justify-content: space-between;">
				<p style="max-width: 60%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
					{transaction.name}
				</p>
				<p>{formatMoney(transaction.value, 'kr')}</p>
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
		</a>
		<div class="flex items-center gap-2 ml-2">
			{#if needsFile}
				<QuickFileUpload 
					{transaction} 
					on:fileUploaded={handleFileUploaded}
				/>
			{/if}
			<Plupp value={transaction.value} />
		</div>
	{/if}
</div>

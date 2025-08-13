<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Color } from '../constants';

	const dispatch = createEventDispatcher();

	export let availableAccounts: string[] = [];
	export let selectedAccounts: string[] = [];
	export let accountCounts: Record<string, number> = {};

	$: accountOptions = [
		...availableAccounts.map(account => ({ 
			id: account, 
			label: `${account} (${accountCounts[account] || 0})` 
		})),
		{ 
			id: 'missing', 
			label: `Missing Account (${accountCounts['missing'] || 0})` 
		}
	];

	$: if (selectedAccounts.length === 0 && accountOptions.length > 0) {
		selectedAccounts = accountOptions.map(option => option.id);
		dispatch('filterChange', selectedAccounts);
	}

	function toggleAccount(accountId: string) {
		if (selectedAccounts.includes(accountId)) {
			selectedAccounts = selectedAccounts.filter(id => id !== accountId);
		} else {
			selectedAccounts = [...selectedAccounts, accountId];
		}
		dispatch('filterChange', selectedAccounts);
	}

	function selectAll() {
		selectedAccounts = accountOptions.map(option => option.id);
		dispatch('filterChange', selectedAccounts);
	}

	function selectNone() {
		selectedAccounts = [];
		dispatch('filterChange', selectedAccounts);
	}
</script>

<div 
	class="filter-container p-4 rounded-lg mb-4"
	style="background-color: {Color.Depth3};"
>
	<div class="flex justify-between items-center mb-3">
		<h3 class="text-white font-medium">Filter by Account</h3>
		<div class="flex gap-2">
			<button 
				class="text-xs px-2 py-1 rounded"
				style="background-color: {Color.Depth4}; color: white;"
				on:click={selectAll}
			>
				All
			</button>
			<button 
				class="text-xs px-2 py-1 rounded"
				style="background-color: {Color.Depth4}; color: white;"
				on:click={selectNone}
			>
				None
			</button>
		</div>
	</div>
	
	<div class="grid grid-cols-2 gap-2">
		{#each accountOptions as option}
			<label class="flex items-center space-x-2 cursor-pointer">
				<input
					type="checkbox"
					checked={selectedAccounts.includes(option.id)}
					on:change={() => toggleAccount(option.id)}
					class="rounded"
				/>
				<span class="text-white text-sm">{option.label}</span>
			</label>
		{/each}
	</div>
	
	<div class="mt-3 text-xs text-gray-300">
		{selectedAccounts.length} of {accountOptions.length} accounts selected
	</div>
</div>

<style>
	input[type="checkbox"] {
		accent-color: #3b82f6;
	}
</style>
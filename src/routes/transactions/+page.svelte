<script lang="ts">
	import { getAllTransactions } from '$lib/api';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import Transaction from '../../components/Transaction.svelte';
	import TransactionsContainer from '../../components/TransactionsContainer.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';

	import AccountFilter from '../../components/AccountFilter.svelte';
	import SearchInput from '../../components/SearchInput.svelte';

	let transactions: import('$lib/types').Transaction[] = [];
	let filteredTransactions: import('$lib/types').Transaction[] = [];
	let selectedAccounts: string[] = [];
	let availableAccounts: string[] = [];
	let accountCounts: Record<string, number> = {};
	let searchQuery: string = '';

	onMount(() => {
		pageTitle.set('Transactions');
	});

	function extractUniqueAccounts(transactions: import('$lib/types').Transaction[]): string[] {
		const accountNames = new Set<string>();
		
		transactions.forEach(transaction => {
			if (transaction.affectedAccount?.name) {
				accountNames.add(transaction.affectedAccount.name);
			}
		});
		
		return Array.from(accountNames).sort();
	}

	function calculateAccountCounts(transactions: import('$lib/types').Transaction[]): Record<string, number> {
		const counts: Record<string, number> = {};
		
		transactions.forEach(transaction => {
			const accountName = transaction.affectedAccount?.name;
			if (accountName) {
				counts[accountName] = (counts[accountName] || 0) + 1;
			} else {
				counts['missing'] = (counts['missing'] || 0) + 1;
			}
		});
		
		return counts;
	}

	async function initialize() {
		transactions = await getAllTransactions(500, 0);
		availableAccounts = extractUniqueAccounts(transactions);
		accountCounts = calculateAccountCounts(transactions);
	}

	function filterTransactions(
		transactions: import('$lib/types').Transaction[], 
		selectedAccounts: string[], 
		searchQuery: string
	) {
		return transactions.filter(transaction => {
			// Account filter
			const accountName = transaction.affectedAccount?.name;
			let accountMatch = false;
			
			if (selectedAccounts.includes('missing') && !accountName) {
				accountMatch = true;
			}
			
			if (accountName && selectedAccounts.includes(accountName)) {
				accountMatch = true;
			}
			
			// Search filter
			const searchMatch = searchQuery.trim() === '' || 
				transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
			
			return accountMatch && searchMatch;
		});
	}

	function handleFilterChange(event: CustomEvent<string[]>) {
		selectedAccounts = event.detail;
	}

	function handleSearch(event: CustomEvent<string>) {
		searchQuery = event.detail;
	}

	$: {
		if ($token) {
			initialize();
		}
	}

	$: filteredTransactions = filterTransactions(transactions, selectedAccounts, searchQuery);
</script>

<VerticalSpacing height={1} />
<SearchInput 
	bind:searchQuery={searchQuery}
	on:search={handleSearch}
	placeholder="Search transactions by name..."
/>
<AccountFilter 
	{availableAccounts}
	{accountCounts}
	bind:selectedAccounts={selectedAccounts}
	on:filterChange={handleFilterChange}
/>
<div class="flex flex-col gap-4" style="max-height: 100vh;">
	<TransactionsContainer title="All transactions ({filteredTransactions.length})" expanded={true}>
		{#each filteredTransactions as transaction (transaction.id)}
			<Transaction {transaction} />
		{/each}
	</TransactionsContainer>
</div>

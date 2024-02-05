<script lang="ts">
	import { getAllThatRequiresAction, getAllTransactions } from '$lib/api';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import Transaction from '../../components/Transaction.svelte';
	import { Color } from '../../constants';
	import TransactionsContainer from '../../components/TransactionsContainer.svelte';

	let transactions: import('$lib/types').Transaction[] = [];
	let transactionsWithAction: import('$lib/types').Transaction[] = [];
	onMount(() => {
		pageTitle.set('Transactions');
	});

	async function initialize() {
		transactions = await getAllTransactions();
		transactionsWithAction = await getAllThatRequiresAction();
	}

	$: {
		if ($token) {
			initialize();
		}
	}
</script>

<div class="flex flex-col gap-8" style="max-height: 100vh;">
	<TransactionsContainer title="All transactions" expanded={transactionsWithAction.length === 0}>
		{#each transactions as transaction (transaction.id)}
			<Transaction {transaction} />
		{/each}
	</TransactionsContainer>
	{#if transactionsWithAction.length > 0}
		<TransactionsContainer title="Transactions with missing data">
			{#each transactionsWithAction as transaction (transaction.id)}
				<Transaction {transaction} />
			{/each}
		</TransactionsContainer>
	{/if}
</div>

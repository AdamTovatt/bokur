<script lang="ts">
	import { getAllAccounts, getAllThatRequiresAction, getAllTransactions } from '$lib/api';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import Transaction from '../../components/Transaction.svelte';
	import { Color } from '../../constants';
	import TransactionsContainer from '../../components/TransactionsContainer.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import MaxWidthContainer from '../../components/MaxWidthContainer.svelte';

	let transactions: import('$lib/types').Transaction[] = [];
	let transactionsWithAction: import('$lib/types').Transaction[] = [];

	onMount(() => {
		pageTitle.set('Transactions');
	});

	async function initialize() {
		transactions = await getAllTransactions(500, 0);
		transactionsWithAction = await getAllThatRequiresAction();
	}

	$: {
		if ($token) {
			initialize();
		}
	}
</script>

<MaxWidthContainer maxWidth={30}>
	<VerticalSpacing height={1} />
	<div class="flex flex-col gap-4" style="max-height: 100vh;">
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
</MaxWidthContainer>

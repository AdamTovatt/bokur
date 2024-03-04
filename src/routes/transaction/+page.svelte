<script lang="ts">
	import Transaction from '../../components/Transaction.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import { Color } from '../../constants';
	import { getTransaction } from '$lib/api';
	import { page } from '$app/stores';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import BokurButton from '../../components/BokurButton.svelte';
	import { routeToPage } from '../../functions/routing';
	import TransactionPageHeader from '../../components/TransactionPageHeader.svelte';
	import HorizontalSpacing from '../../components/HorizontalSpacing.svelte';
	import TransactionDetail from '../../components/TransactionDetail.svelte';

	onMount(() => {
		pageTitle.set('Transaction');
	});

	let transaction: import('$lib/types').Transaction;
	let transactionId = $page.url.searchParams.get('id');

	async function initialize() {
		transaction = await getTransaction(transactionId!);
	}

	$: {
		if ($token && transactionId) {
			initialize();
		}
	}
</script>

<VerticalSpacing height={1} />
<div style="max-width: 100vw">
	<HorizontalSpacing width={1} />
	{#if transaction}
		<TransactionPageHeader {transaction} />
	{/if}
</div>
<div style="width: 100%; display: flex; flex: 1; flex-direction: column; justify-content: flex-end">
	<VerticalSpacing height={1} />
	<div
		class="flex flex-row p-3 rounded-2xl items-center relative"
		style={`
        background-color: ${Color.Depth2}; 
        color: ${Color.White};
        font-size: 0.8rem;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        `}
	>
		{#if transaction}
			<div style={'width: 100%'}>
				<TransactionDetail
					hasBorder={transaction.affectedAccount === null}
					label={'Account: ' + (transaction.affectedAccount ?? '(missing account)')}
					buttonText={transaction.affectedAccount === null ? 'Choose account' : 'Change account'}
					onClick={() => {}}
				/>
				<VerticalSpacing height={1} />
				<TransactionDetail
					hasBorder={transaction.associatedFileName === null}
					label={'File: ' + (transaction.associatedFileName ?? '(no file)')}
					buttonText={transaction.associatedFileName === null ? 'Add file' : 'Download file'}
					onClick={() => {}}
				/>
			</div>
		{:else}
			<div style="min-height: 10rem">Loading....</div>
		{/if}
	</div>
	<!-- <VerticalSpacing height={1} />
	<BokurButton
		additionalStyling="max-width: 5rem"
		backgroundColor={Color.Depth4}
		onClick={() => {
			routeToPage('transactions');
		}}>Back</BokurButton
	> -->
</div>
<VerticalSpacing height={5} />

<script lang="ts">
	import Transaction from '../../components/Transaction.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import { Color } from '../../constants';
	import {
		deleteTransactionFile,
		downloadTransactionFile,
		getAllAccounts,
		getTransaction,
		updateTransaction,
		uploadFile
	} from '$lib/api';
	import { page } from '$app/stores';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import BokurButton from '../../components/BokurButton.svelte';
	import { routeToPage } from '../../functions/routing';
	import TransactionPageHeader from '../../components/TransactionPageHeader.svelte';
	import HorizontalSpacing from '../../components/HorizontalSpacing.svelte';
	import TransactionDetail from '../../components/TransactionDetail.svelte';
	import type { Account } from '$lib/types';
	import AccountPicker from '../../components/AccountPicker.svelte';
	import FilePicker from '../../components/FilePicker.svelte';
	import { assets } from '$app/paths';

	onMount(() => {
		pageTitle.set('Transaction');
	});

	let transaction: import('$lib/types').Transaction;
	let transactionId = $page.url.searchParams.get('id');
	let accounts: Account[];

	let isPickingAccount: boolean = false;
	let isUploadingFile: boolean = false;

	async function initialize() {
		transaction = await getTransaction(transactionId!);
		accounts = await getAllAccounts();
	}

	$: {
		if ($token && transactionId) {
			initialize();
		}
	}

	async function accountWasChosen(account: Account) {
		transaction.affectedAccount = { id: account.id, name: account.name };
		isPickingAccount = false;
		await updateTransaction(transaction);
	}

	async function fileWasChosen(file: File, fileName: string) {
		transaction.associatedFileName = fileName;
		isUploadingFile = false;
		await uploadFile(file, transaction.id);
		await getTransaction(transactionId!);
	}

	async function deleteFile() {
		await deleteTransactionFile(transaction.id);
		transaction.associatedFileName = null;
	}
</script>

<VerticalSpacing height={1} />
{#if isPickingAccount || isUploadingFile}
	<button
		style="width: 100%; display: flex; flex-direction: row; justify-content:center; flex: 1; cursor: default;"
		on:click={() => {
			isUploadingFile = false;
			isPickingAccount = false;
		}}
	>
		<div style="display: flex; flex-direction: column; justify-content: center;">
			{#if isPickingAccount}
				<AccountPicker {accounts} onClick={accountWasChosen} />
			{/if}
			{#if isUploadingFile}
				<FilePicker onFilePicked={fileWasChosen} />
			{/if}
		</div>
	</button>
{:else}
	<div style="max-width: 100vw">
		<HorizontalSpacing width={1} />
		{#if transaction}
			<TransactionPageHeader
				{transaction}
				onIgnoredUpdated={async (transaction, newValue) => {
					transaction.ignored = newValue;
					await updateTransaction(transaction);
				}}
			/>
		{/if}
	</div>
	<div
		style="width: 100%; display: flex; flex: 1; flex-direction: column; justify-content: flex-end"
	>
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
						label={'Account: ' + (transaction.affectedAccount?.name ?? '(missing account)')}
						buttonText={transaction.affectedAccount === null ? 'Choose account' : 'Change account'}
						onClick={() => {
							isPickingAccount = true;
						}}
					/>
					<VerticalSpacing height={1} />
					<TransactionDetail
						onWantsToDelete={deleteFile}
						showDeleteButton={transaction.associatedFileName !== null}
						hasBorder={transaction.associatedFileName === null}
						label={'File: ' + (transaction.associatedFileName ?? '(no file)')}
						buttonText={transaction.associatedFileName === null ? 'Add file' : 'Download file'}
						onClick={async () => {
							if (transaction.associatedFileName === null) isUploadingFile = true;
							else await downloadTransactionFile(transaction.id, transaction.associatedFileName);
						}}
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
{/if}
<VerticalSpacing height={5} />

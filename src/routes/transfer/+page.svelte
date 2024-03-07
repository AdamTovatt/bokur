<script lang="ts">
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import { BorderRadius, Color } from '../../constants';
	import BokurButton from '../../components/BokurButton.svelte';
	import {
		deleteTransactionFile,
		downloadTransactionFile,
		getAllAccounts,
		getTransaction,
		setTransactionAccount,
		setTransactionAmount,
		updateTransaction,
		uploadFile
	} from '$lib/api';
	import { page } from '$app/stores';
	import { pageTitle, token } from '$lib/store';
	import { onMount } from 'svelte';
	import TransactionPageHeader from '../../components/TransactionPageHeader.svelte';
	import HorizontalSpacing from '../../components/HorizontalSpacing.svelte';
	import type { Account } from '$lib/types';
	import AccountPicker from '../../components/AccountPicker.svelte';

	onMount(() => {
		pageTitle.set('Transfer');
	});

	let transaction: import('$lib/types').Transaction;
	let transactionId = $page.url.searchParams.get('id');
	let accounts: Account[];

	let isPickingAccount: boolean = false;
	let transferAmount: number | undefined;
	let targetAccount: Account | undefined;

	async function initialize() {
		accounts = await getAllAccounts();

		resetTransferInput(true);
	}

	$: {
		if ($token && transactionId) {
			initialize();
		}
	}

	async function submitChanges(): Promise<boolean> {
		if (!transferAmount) return false;

		let transferNumber = +transferAmount;
		if (transferNumber && targetAccount) {
			if (transferNumber !== transaction.value) {
				await setTransactionAmount(transaction.id, transferAmount);
			}

			if (targetAccount.id !== transaction.affectedAccount.id) {
				await setTransactionAccount(transaction.id, targetAccount.id);
			}
			return true;
		}

		return false;
	}

	async function resetTransferInput(fetchNewData: boolean) {
		if (fetchNewData) transaction = await getTransaction(transactionId!);

		targetAccount = transaction.affectedAccount;
		transferAmount = transaction.value;
	}
</script>

<VerticalSpacing height={1} />
<div style="max-width: 100vw">
	<HorizontalSpacing width={1} />
	{#if transaction}
		<TransactionPageHeader
			{transaction}
			onIgnoredUpdated={async (transaction) => {
				await updateTransaction(transaction);
			}}
		/>
	{/if}
</div>
<div style="display: flex; flex-direction: column; flex: 1; justify-content: flex-end;">
	<div
		style="background-color: {Color.Depth2};
    color: {Color.White};
    padding: 0.75rem; border-radius: {BorderRadius.Default};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
	>
		<div style="display: flex; flex-direction: column;">
			{#if isPickingAccount}
				<AccountPicker
					useContainer={false}
					{accounts}
					onClick={(account) => {
						targetAccount = account;
						isPickingAccount = false;
					}}
				/>
			{:else}
				<div style="font-weight: 300;">
					Transfer amount: {transferAmount ? transferAmount + ' kr' : ''}
				</div>
				<VerticalSpacing height={0.2} />
				<input
					bind:value={transferAmount}
					style="background-color: {Color.Depth4};
            font-weight: 300;
            box-shadow: inset 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
            color: {Color.White};
            border-radius: {BorderRadius.Small};
            text-align: right;
            padding: 0.5rem;
            padding-left: 1rem;
            padding-right: 1rem;"
					type="text"
				/>
				<VerticalSpacing height={0.8} />
				<div style="font-weight: 300;">
					Target account: {targetAccount ? targetAccount.name : '(No account chosen)'}
				</div>
				<VerticalSpacing height={0.2} />
				<BokurButton
					fontSize={0.8}
					additionalStyling={'font-weight: 300;'}
					padding={0.75}
					backgroundColor={Color.Depth4}
					onClick={() => {
						isPickingAccount = true;
					}}
				>
					Choose account
				</BokurButton>
				<VerticalSpacing height={1} />
				{#if transferAmount && targetAccount && (transferAmount.toString() !== transaction.value.toString() || targetAccount?.id !== transaction.affectedAccount?.id)}
					<div style="display: flex; flex-direction: row;">
						<BokurButton
							additionalStyling={'font-weight: 300;'}
							fontSize={0.8}
							padding={0.75}
							backgroundColor={Color.Depth4}
							onClick={() => {
								resetTransferInput(false);
							}}
						>
							Discard changes
						</BokurButton>
						<HorizontalSpacing width={1} />
						<BokurButton
							hasBorder={true}
							additionalStyling={'font-weight: 300;'}
							fontSize={0.8}
							padding={0.75}
							backgroundColor={Color.Depth4}
							onClick={async () => {
								if (await submitChanges()) resetTransferInput(true);
							}}
						>
							Save changes
						</BokurButton>
					</div>
				{:else}
					<div
						style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
					>
						<VerticalSpacing height={0.66} />
						<div style="font-weight: 300;">(No changes have been made yet)</div>
						<VerticalSpacing height={0.66} />
					</div>
				{/if}
			{/if}
		</div>
	</div>
</div>
<VerticalSpacing height={5} />

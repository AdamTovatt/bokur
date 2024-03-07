<script lang="ts">
	import type { Account, Transaction } from '$lib/types';
	import { BorderRadius, Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	import Plus from '../icons/Plus.svelte';
	import HorizontalSpacing from './HorizontalSpacing.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import AccountPicker from './AccountPicker.svelte';
	import { createTransfer, getTransaction } from '$lib/api';
	import TransferRow from './TransferRow.svelte';

	export let transaction: Transaction;
	export let accounts: Account[];
	export let onCreatedTransfer: () => void;

	let transferAmount: number | undefined;
	let targetAccount: Account | undefined;
	let isCreatingTransfer: boolean = false;
	let isPickingAccount: boolean = false;

	async function submitTransfer(): Promise<boolean> {
		if (!transferAmount) return false;

		let transferNumber = +transferAmount;
		if (transferNumber && targetAccount) {
			await createTransfer(transaction.id, targetAccount.id, transferNumber);
			transaction = await getTransaction(transaction.id.toString());
			onCreatedTransfer();
			return true;
		}

		return false;
	}

	function resetTransferInput() {
		transferAmount = undefined;
		targetAccount = undefined;
		isCreatingTransfer = false;
	}

	console.log(transaction);

	function getSibling(otherSibling: Transaction) {
		if (!transaction.children || transaction.children.length === 0) return undefined;

		return transaction.children.find((sibling) => sibling.siblingId === otherSibling.id);
	}
</script>

<div
	style="background-color: {Color.Depth2};
    color: {Color.White};
    padding: 0.75rem; border-radius: {BorderRadius.Default};
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
>
	{#if !isCreatingTransfer}
		<div style="display: flex; flex-direction: column;">
			{#each transaction.children as transfer}
				{#if transfer.value > 0}
					<TransferRow transaction={transfer} siblingTransaction={getSibling(transfer)} />
				{/if}
			{/each}
			<VerticalSpacing height={0.5} />
			<div style="display: flex; justify-content: flex-end; align-items: center;">
				<div style="font-weight: 300;">Create transfer</div>
				<HorizontalSpacing width={1} />
				<div>
					<BokurButton
						padding={0.75}
						backgroundColor={Color.Depth4}
						onClick={() => {
							isCreatingTransfer = true;
						}}><Plus /></BokurButton
					>
				</div>
			</div>
		</div>
	{:else}
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
				<div style="display: flex; flex-direction: row;">
					<div style="width: 40%">
						<BokurButton
							additionalStyling={'font-weight: 300;'}
							fontSize={0.8}
							padding={0.75}
							backgroundColor={Color.Depth4}
							onClick={() => {
								resetTransferInput();
							}}
						>
							Cancel
						</BokurButton>
					</div>
					<HorizontalSpacing width={1} />
					<BokurButton
						hasBorder={true}
						additionalStyling={'font-weight: 300;'}
						fontSize={0.8}
						padding={0.75}
						backgroundColor={Color.Depth4}
						onClick={async () => {
							if (await submitTransfer()) resetTransferInput();
						}}
					>
						Create
					</BokurButton>
				</div>
			{/if}
		</div>
	{/if}
</div>

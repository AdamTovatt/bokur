<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { Color } from '../constants';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import TrashIcon from '../icons/TrashIcon.svelte';
	import CogIcon from '../icons/CogIcon.svelte';
	import { routeToPage } from '../functions/routing';
	import { formatMoney } from '$lib/functions';

	export let transaction: Transaction;
	export let siblingTransaction: Transaction | undefined;
</script>

<div
	style="background-color: {Color.Depth3};
    margin-bottom: 0.2rem;
    font-size: 0.8rem;
    font-weight: 300;
    padding-left: 1rem;"
>
	<div style="display: flex; flex-direction: row; height: 100%; align-items: center;">
		<div>
			To <strong>{transaction.affectedAccount.name}</strong> (from {siblingTransaction
				? siblingTransaction.affectedAccount.name
				: 'missing account'}):
			<strong>{formatMoney(transaction.value, 'kr')}</strong>
		</div>
		<div style="display: flex; flex-direction: row; flex: 1; justify-content: flex-end;">
			<button
				style="background-color: {Color.Depth4}; padding-top: 0.5rem; padding-bottom: 0.5rem;"
			>
				<TrashIcon />
			</button>
			<button
				style="background-color: {Color.Depth5}; padding-top: 0.5rem; padding-bottom: 0.5rem;"
				on:click={() => {
					routeToPage('transfer?id=' + transaction.id);
				}}
			>
				<CogIcon />
			</button>
		</div>
	</div>
</div>

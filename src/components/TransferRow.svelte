<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { Color } from '../constants';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import TrashIcon from '../icons/TrashIcon.svelte';
	import CogIcon from '../icons/CogIcon.svelte';

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
			<strong>{transaction.value} kr</strong>
		</div>
		<div style="display: flex; flex-direction: row; flex: 1; justify-content: flex-end;">
			<div style="background-color: {Color.Depth4}; padding-top: 0.5rem; padding-bottom: 0.5rem;">
				<TrashIcon />
			</div>
			<div style="background-color: {Color.Depth5}; padding-top: 0.5rem; padding-bottom: 0.5rem; ">
				<CogIcon />
			</div>
		</div>
	</div>
</div>

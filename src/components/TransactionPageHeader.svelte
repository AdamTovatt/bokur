<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import Plupp from './Plupp.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	export let transaction: Transaction;
	export let onIgnoredUpdated: (transaction: Transaction, ignored: boolean) => void;

	let isChecked = false; // Assuming you want the checkbox initially unchecked
</script>

<div
	class="flex flex-row p-3 rounded-2xl items-center relative"
	style={`
        background-color: ${Color.Depth4}; 
        color: ${Color.White};
        font-size: 0.8rem;
        flex: 1;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        `}
>
	<div class="flex flex-col" style="width: 98%;">
		<div class="flex flex-row justify-between mb-1">
			<p
				style="max-width: 100%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: 0.9rem"
			>
				{transaction.name}
			</p>
		</div>
		<div class="flex flex-row justify-between">
			<p>
				{#if transaction.affectedAccount}
					{transaction.affectedAccount}
				{:else}
					(missing account)
				{/if}
			</p>
			<p>{transaction.value} kr</p>
		</div>
		<VerticalSpacing height={0.5} />
		<div class="flex flex-row justify-between mb-1">
			<p>
				Ignored:
				<span
					><input
						type="checkbox"
						bind:checked={transaction.ignored}
						on:change={() => {
							onIgnoredUpdated(transaction, transaction.ignored);
						}}
					/></span
				>
			</p>
			<p>{new Date(transaction.date).toLocaleDateString('sv-SE')}</p>
		</div>
	</div>
	<Plupp value={transaction.value} />
</div>

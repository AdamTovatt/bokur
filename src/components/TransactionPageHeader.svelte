<script lang="ts">
	import type { Transaction } from '$lib/types';
	import { onMount } from 'svelte';
	import { Color } from '../constants';
	import Plupp from './Plupp.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import BokurButton from './BokurButton.svelte';
	import { updateTransaction } from '$lib/api';

	export let transaction: Transaction;
	export let onIgnoredUpdated: (transaction: Transaction) => void;

	let hasNameChanges = false;

	function handleInput(event: Event) {
		let textArea = event.target as HTMLTextAreaElement;
		hasNameChanges = true;
		resize(textArea);
	}

	function resize(textArea: HTMLTextAreaElement) {
		let scrollHeight = textArea.scrollHeight; // !! IMPORTANT !! for some reason we have to store the height in a variable like this or it won't work
		textArea.style.height = '5px'; // Reset height to auto to recalculate actual height
		textArea.style.height = textArea.scrollHeight + 'px'; // Set height
	}

	async function applyNameChanges() {
		await updateTransaction(transaction);
		hasNameChanges = false;
	}

	onMount(() => {
		let textArea = document.getElementById('nameInput') as HTMLTextAreaElement;
		resize(textArea);
	});
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
			<textarea
				id="nameInput"
				bind:value={transaction.name}
				style="width: 100%; overflow: hidden; font-size: 0.9rem; resize: none; background-color: transparent;"
				on:input={handleInput}
			/>
		</div>
		<div class="flex flex-row justify-between">
			<p>
				{#if transaction.affectedAccount}
					{transaction.affectedAccount.name}
				{:else}
					(missing account)
				{/if}
			</p>
			<p>{transaction.value} kr</p>
		</div>
		<VerticalSpacing height={0.5} />
		<div class="flex flex-row justify-between mb-1">
			<p style="font-weight: 300;">
				Ignored:
				<span
					><input
						type="checkbox"
						bind:checked={transaction.ignored}
						on:change={() => {
							onIgnoredUpdated(transaction);
						}}
					/></span
				>
			</p>
			<p style="font-weight: 300;">
				Ignore file requirement:
				<span
					><input
						type="checkbox"
						bind:checked={transaction.ignoreFileRequirement}
						on:change={() => {
							onIgnoredUpdated(transaction);
						}}
					/></span
				>
			</p>
			<p>{new Date(transaction.date).toLocaleDateString('sv-SE')}</p>
		</div>
		{#if hasNameChanges}
			<VerticalSpacing height={1} />
			<BokurButton hasBorder={true} backgroundColor={Color.Depth6} onClick={applyNameChanges}
				>Apply name changes</BokurButton
			>
		{/if}
	</div>
	<Plupp value={transaction.value} />
</div>

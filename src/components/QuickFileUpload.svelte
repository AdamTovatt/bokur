<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { uploadFile } from '$lib/api';
	import { Color } from '../constants';
	import type { Transaction } from '$lib/types';

	const dispatch = createEventDispatcher();

	export let transaction: Transaction;
	
	let isUploading = false;
	let fileInput: HTMLInputElement;

	async function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		
		if (!file) return;

		try {
			isUploading = true;
			await uploadFile(file, transaction.id);
			dispatch('fileUploaded', { transactionId: transaction.id, fileName: file.name });
		} catch (error) {
			console.error('Upload failed:', error);
		} finally {
			isUploading = false;
			input.value = ''; // Reset input
		}
	}

	function triggerFileInput() {
		fileInput.click();
	}
</script>

<button
	class="upload-btn flex items-center justify-center rounded-full p-1 transition-colors"
	style="background-color: {Color.Depth2}; min-width: 28px; min-height: 28px;"
	on:click={triggerFileInput}
	disabled={isUploading}
	title="Upload file for this transaction"
>
	{#if isUploading}
		<div class="text-xs text-white">⏳</div>
	{:else}
		<div class="text-xs text-white">📎</div>
	{/if}
</button>

<input
	bind:this={fileInput}
	type="file"
	accept=".jpg,.jpeg,.png,.webp,.pdf"
	on:change={handleFileSelect}
	style="display: none;"
/>

<style>
	.upload-btn:hover {
		opacity: 0.8;
	}
	
	.upload-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
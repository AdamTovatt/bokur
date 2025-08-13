<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { generatePdf } from '$lib/api';

	export let formData: any;
	export let uploadedFile: File | null;

	let isGenerating = false;
	const dispatch = createEventDispatcher();

	async function handleGeneratePdf() {
		const jsonData = JSON.stringify(formData);
		
		// Basic validation
		if (!uploadedFile) {
			dispatch('error', 'Please upload a CSV file from Clockify');
			return;
		}
		
		if (!formData.invoiceInformation.number.trim()) {
			dispatch('error', 'Invoice number is required');
			return;
		}
		
		if (!formData.invoiceInformation.receiver.name.trim()) {
			dispatch('error', 'Receiver company name is required');
			return;
		}
		
		if (!formData.generalInformation.sender.name.trim()) {
			dispatch('error', 'Sender company name is required');
			return;
		}

		isGenerating = true;
		
		try {
			await generatePdf(uploadedFile, jsonData);
		} catch (e) {
			dispatch('error', 'Failed to generate PDF: ' + (e instanceof Error ? e.message : String(e)));
		} finally {
			isGenerating = false;
		}
	}
</script>

<div class="generate-section">
	<button 
		class="generate-btn"
		disabled={isGenerating}
		on:click={handleGeneratePdf}
	>
		{#if isGenerating}
			<div class="spinner-container">
				<div class="spinner"></div>
			</div>
			<span>Generating PDF...</span>
		{:else}
			<span>🚀 Generate PDF Invoice</span>
		{/if}
	</button>
</div>

<style>
	.generate-section {
		text-align: center;
	}

	.generate-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
		color: white;
		border: none;
		border-radius: 12px;
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		min-height: 3.5rem;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
		position: relative;
		overflow: hidden;
	}

	.generate-btn:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
		background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
	}

	.generate-btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.generate-btn:disabled {
		opacity: 0.8;
		cursor: not-allowed;
		transform: none;
	}

	.spinner-container {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		flex-grow: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.spinner {
		width: 20px;
		height: 20px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	@media (max-width: 768px) {
		.generate-btn {
			width: 100%;
			padding: 1rem;
			font-size: 0.875rem;
		}
	}
</style>
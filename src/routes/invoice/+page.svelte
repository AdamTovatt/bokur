<script lang="ts">
	import { generatePdf } from '$lib/api';
	import BokurButton from '../../components/BokurButton.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import Panel from '../../components/Panel.svelte';
	import { Color } from '../../constants';
	import { onMount } from 'svelte';
	import { pageTitle } from '$lib/store';
	import { fly } from 'svelte/transition';

	let errorMessage = '';
	let selectedTemplate = '';
	let showSuccessSnackbar = false;
	let successMessage = '';
	let templates = [
		{ id: '', name: 'Select a template...' }
	];
	let templatesLoading = true;
	
	// File upload state
	let uploadedFile: File | null = null;
	let isDragOver = false;
	
	// Loading state
	let isGenerating = false;

	// Form data structure
	let formData = {
		invoiceInformation: {
			number: '',
			comment: '',
			daysToPay: 30,
			includeTax: false,
			swedish: false,
			includeBreakdown: true,
			receiver: {
				name: '',
				address: {
					firstLine: '',
					secondLine: ''
				},
				organizationNumber: '',
				reference: {
					name: '',
					email: '',
					phoneNumber: ''
				}
			}
		},
		generalInformation: {
			logoUrl: '',
			sender: {
				name: '',
				address: {
					firstLine: '',
					secondLine: ''
				},
				organizationNumber: '',
				reference: {
					name: '',
					email: '',
					phoneNumber: ''
				}
			},
			paymentInformation: {
				bic: '',
				iban: '',
				bankgiroNumber: ''
			},
			defaultUnitPrice: 900,
			unitPriceOverride: {}
		}
	};

	async function loadTemplate(templateId: string) {
		if (!templateId) return;
		
		try {
			const response = await fetch(`/templates/${templateId}.json`);
			if (!response.ok) throw new Error('Template not found');
			
			const template = await response.json();
			
			// Replace form data with template data
			formData = {
				invoiceInformation: { ...template.invoiceInformation },
				generalInformation: { ...template.generalInformation }
			};
			
			// Show success snackbar
			successMessage = `Template "${template.name}" loaded successfully!`;
			showSuccessSnackbar = true;
			
			// Hide snackbar after 3 seconds
			setTimeout(() => {
				showSuccessSnackbar = false;
			}, 3000);
		} catch (e) {
			errorMessage = 'Failed to load template: ' + (e instanceof Error ? e.message : String(e));
		}
	}

	function handleTemplateChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		loadTemplate(target.value);
	}

	// File upload functions
	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && validateFile(file)) {
			uploadedFile = file;
			errorMessage = '';
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
		
		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			const file = files[0];
			if (validateFile(file)) {
				uploadedFile = file;
				errorMessage = '';
			}
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
	}

	function validateFile(file: File): boolean {
		if (!file.name.toLowerCase().endsWith('.csv')) {
			errorMessage = 'Please upload a CSV file from Clockify';
			return false;
		}
		if (file.size > 10 * 1024 * 1024) { // 10MB limit
			errorMessage = 'File size must be less than 10MB';
			return false;
		}
		return true;
	}

	function removeFile() {
		uploadedFile = null;
		errorMessage = '';
	}

	async function handleGeneratePdf() {
		const jsonData = JSON.stringify(formData);
		
		// Basic validation
		if (!uploadedFile) {
			errorMessage = 'Please upload a CSV file from Clockify';
			return;
		}
		
		if (!formData.invoiceInformation.number.trim()) {
			errorMessage = 'Invoice number is required';
			return;
		}
		
		if (!formData.invoiceInformation.receiver.name.trim()) {
			errorMessage = 'Receiver company name is required';
			return;
		}
		
		if (!formData.generalInformation.sender.name.trim()) {
			errorMessage = 'Sender company name is required';
			return;
		}

		errorMessage = '';
		isGenerating = true;
		
		try {
			await generatePdf(uploadedFile, jsonData);
		} catch (e) {
			errorMessage = 'Failed to generate PDF: ' + (e instanceof Error ? e.message : String(e));
		} finally {
			isGenerating = false;
		}
	}

	async function loadAvailableTemplates() {
		try {
			const response = await fetch('/api/templates');
			if (response.ok) {
				const availableTemplates = await response.json();
				templates = [
					{ id: '', name: 'Select a template...' },
					...availableTemplates
				];
			}
		} catch (error) {
			console.error('Failed to load templates:', error);
		} finally {
			templatesLoading = false;
		}
	}

	onMount(() => {
		pageTitle.set('Invoice Generator');
		loadAvailableTemplates();
	});
</script>

<VerticalSpacing height={1} />

<!-- Invoice Configuration -->
<Panel backgroundColor={Color.Depth3}>
	<div class="header-section">
		<h3 class="text-lg font-semibold text-white mb-4 mobile-header">📋 Invoice Configuration</h3>
		
		<!-- Template Selector -->
		<div class="template-selector mb-6">
			<label for="template-select" class="block text-white text-sm font-medium mb-2">💾 Load Template</label>
			<select 
				id="template-select"
				bind:value={selectedTemplate}
				on:change={handleTemplateChange}
				class="template-select"
				disabled={templatesLoading}
			>
				{#if templatesLoading}
					<option value="">Loading templates...</option>
				{:else}
					{#each templates as template}
						<option value={template.id}>{template.name}</option>
					{/each}
				{/if}
			</select>
		</div>
		
		<!-- File Upload Section -->
		<div class="upload-section mb-6">
			<label for="csv-file-input" class="block text-white text-sm font-medium mb-2">📊 Upload Clockify CSV</label>
			<div 
				class="upload-area"
				class:drag-over={isDragOver}
				on:drop={handleDrop}
				on:dragover={handleDragOver}
				on:dragleave={handleDragLeave}
				role="button"
				tabindex="0"
			>
				{#if uploadedFile}
					<div class="uploaded-file">
						<div class="file-info">
							<span class="file-icon">📄</span>
							<div class="file-details">
								<span class="file-name">{uploadedFile.name}</span>
								<span class="file-size">{Math.round(uploadedFile.size / 1024)} KB</span>
							</div>
						</div>
						<button 
							class="remove-file-btn"
							on:click={removeFile}
							type="button"
						>
							✕
						</button>
					</div>
				{:else}
					<div class="upload-prompt">
						<div class="upload-icon">📤</div>
						<p class="upload-text">Drop your Clockify CSV here or <span class="upload-link">browse files</span></p>
						<p class="upload-hint">CSV files up to 10MB</p>
					</div>
					<input 
						id="csv-file-input"
						type="file" 
						accept=".csv"
						on:change={handleFileSelect}
						class="file-input"
						aria-label="Upload CSV file"
					/>
				{/if}
			</div>
		</div>
	</div>
	
	<div class="main-grid">
		<!-- Left Column: Invoice & Receiver Info -->
		<div class="space-y-6">
			<!-- Invoice Information Section -->
			<div class="form-section">
				<h4 class="section-title">📋 Invoice Information</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="invoice-number">Invoice Number</label>
						<input id="invoice-number" type="text" bind:value={formData.invoiceInformation.number} placeholder="1050" />
					</div>
					<div class="form-group">
						<label for="days-to-pay">Days to Pay</label>
						<input id="days-to-pay" type="number" bind:value={formData.invoiceInformation.daysToPay} />
					</div>
				</div>
				
				<div class="checkbox-section">
					<div class="checkbox-grid">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={formData.invoiceInformation.includeTax} />
							Include Tax
						</label>
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={formData.invoiceInformation.swedish} />
							Swedish Format
						</label>
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={formData.invoiceInformation.includeBreakdown} />
							Include Breakdown
						</label>
					</div>
				</div>
				<div class="mt-6">
					<label for="invoice-comment" class="block text-white text-sm font-medium mb-2">Comment</label>
					<textarea id="invoice-comment" bind:value={formData.invoiceInformation.comment} placeholder="Additional notes for the invoice..." class="comment-textarea"></textarea>
				</div>
			</div>

			<!-- Receiver Information Section -->
			<div class="form-section">
				<h4 class="section-title">🏢 Receiver Information</h4>
				<div class="form-grid">
					<div class="form-group col-span-full">
						<label for="receiver-name">Company Name</label>
						<input id="receiver-name" type="text" bind:value={formData.invoiceInformation.receiver.name} placeholder="Careless Technologies Limited" />
					</div>
					<div class="form-group">
						<label for="receiver-address1">Address Line 1</label>
						<input id="receiver-address1" type="text" bind:value={formData.invoiceInformation.receiver.address.firstLine} placeholder="71-75 Shelton Street, Covent Garden" />
					</div>
					<div class="form-group">
						<label for="receiver-address2">Address Line 2</label>
						<input id="receiver-address2" type="text" bind:value={formData.invoiceInformation.receiver.address.secondLine} placeholder="WC2H 9JQ, London, United Kingdom" />
					</div>
					<div class="form-group">
						<label for="receiver-org">Organization Number</label>
						<input id="receiver-org" type="text" bind:value={formData.invoiceInformation.receiver.organizationNumber} placeholder="Optional" />
					</div>
					<div class="form-group">
						<label for="receiver-contact">Contact Name</label>
						<input id="receiver-contact" type="text" bind:value={formData.invoiceInformation.receiver.reference.name} placeholder="André de Neergaaard" />
					</div>
					<div class="form-group">
						<label for="receiver-email">Contact Email</label>
						<input id="receiver-email" type="email" bind:value={formData.invoiceInformation.receiver.reference.email} placeholder="andre@wearecareless.com" />
					</div>
					<div class="form-group">
						<label for="receiver-phone">Contact Phone</label>
						<input id="receiver-phone" type="tel" bind:value={formData.invoiceInformation.receiver.reference.phoneNumber} placeholder="Optional" />
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Sender & Payment Info -->
		<div class="space-y-6">
			<!-- Sender Information Section -->
			<div class="form-section">
				<h4 class="section-title">🏪 Sender Information</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="sender-name">Company Name</label>
						<input id="sender-name" type="text" bind:value={formData.generalInformation.sender.name} placeholder="Sakur AB" />
					</div>
					<div class="form-group">
						<label for="logo-url">Logo URL</label>
						<input id="logo-url" type="url" bind:value={formData.generalInformation.logoUrl} placeholder="https://example.com/logo.png" />
					</div>
					<div class="form-group">
						<label for="sender-address1">Address Line 1</label>
						<input id="sender-address1" type="text" bind:value={formData.generalInformation.sender.address.firstLine} placeholder="Stora Tvärgatan 13, 1001" />
					</div>
					<div class="form-group">
						<label for="sender-address2">Address Line 2</label>
						<input id="sender-address2" type="text" bind:value={formData.generalInformation.sender.address.secondLine} placeholder="223 53 Lund" />
					</div>
					<div class="form-group">
						<label for="sender-org">Organization Number</label>
						<input id="sender-org" type="text" bind:value={formData.generalInformation.sender.organizationNumber} placeholder="559318-1471" />
					</div>
					<div class="form-group">
						<label for="sender-contact">Contact Name</label>
						<input id="sender-contact" type="text" bind:value={formData.generalInformation.sender.reference.name} placeholder="Adam Tovatt" />
					</div>
					<div class="form-group">
						<label for="sender-email">Contact Email</label>
						<input id="sender-email" type="email" bind:value={formData.generalInformation.sender.reference.email} placeholder="adam@sakur.se" />
					</div>
					<div class="form-group">
						<label for="sender-phone">Contact Phone</label>
						<input id="sender-phone" type="tel" bind:value={formData.generalInformation.sender.reference.phoneNumber} placeholder="+46 73-634 24 92" />
					</div>
				</div>
			</div>

			<!-- Payment Information Section -->
			<div class="form-section">
				<h4 class="section-title">💳 Payment Information</h4>
				<div class="form-grid">
					<div class="form-group">
						<label for="payment-bic">BIC</label>
						<input id="payment-bic" type="text" bind:value={formData.generalInformation.paymentInformation.bic} placeholder="NDEASESS" />
					</div>
					<div class="form-group">
						<label for="payment-iban">IBAN</label>
						<input id="payment-iban" type="text" bind:value={formData.generalInformation.paymentInformation.iban} placeholder="SE5595000099603418965103" />
					</div>
					<div class="form-group">
						<label for="payment-bankgiro">Bankgiro Number</label>
						<input id="payment-bankgiro" type="text" bind:value={formData.generalInformation.paymentInformation.bankgiroNumber} placeholder="5682-4618" />
					</div>
					<div class="form-group">
						<label for="default-price">Default Unit Price</label>
						<input id="default-price" type="number" bind:value={formData.generalInformation.defaultUnitPrice} />
					</div>
				</div>
			</div>
		</div>
	</div>
</Panel>

<VerticalSpacing height={1} />

<!-- Generate Button -->
<Panel backgroundColor={Color.Depth3}>
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
		{#if errorMessage}
			<p class="error-message">{errorMessage}</p>
		{/if}
	</div>
</Panel>

<!-- Success Snackbar -->
{#if showSuccessSnackbar}
	<div class="snackbar" transition:fly={{ y: 50, duration: 300 }}>
		<div class="snackbar-content">
			<span class="snackbar-icon">✅</span>
			<span class="snackbar-text">{successMessage}</span>
			<button class="snackbar-close" on:click={() => showSuccessSnackbar = false}>✕</button>
		</div>
	</div>
{/if}

<VerticalSpacing height={2} />

<style>
	.form-section {
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.02);
		min-height: fit-content;
	}

	.section-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: white;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	.main-grid {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	@media (min-width: 1024px) {
		.main-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 3rem;
		}
		
		.form-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1400px) {
		.main-grid {
			gap: 4rem;
		}
		
		.form-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group.col-span-full {
		grid-column: 1 / -1;
	}

	.checkbox-section {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1.5rem;
		margin-top: 1.5rem;
	}

	.checkbox-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.checkbox-grid {
			grid-template-columns: 1fr;
			gap: 0.75rem;
		}
		
		.checkbox-section {
			margin-top: 1rem;
			padding-top: 1rem;
		}
	}

	.form-group label {
		color: white;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
		display: block;
	}

	.form-group input {
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		color: white;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		width: 100%;
	}

	.form-group input:focus {
		outline: none;
		border-color: #3B82F6;
		background-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.form-group input::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.comment-textarea {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		color: white;
		font-size: 0.875rem;
		transition: all 0.2s ease;
		resize: vertical;
		min-height: 5rem;
	}

	.comment-textarea:focus {
		outline: none;
		border-color: #3B82F6;
		background-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.comment-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}
	
	.mt-6 {
		margin-top: 1.5rem;
	}
	
	.generate-section {
		padding: 0;
	}
	
	.header-section {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.template-selector {
		max-width: 300px;
	}

	.template-select {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		color: white;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.template-select:focus {
		outline: none;
		border-color: #3B82F6;
		background-color: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.template-select option {
		background-color: #1f2937;
		color: white;
	}

	.template-select:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		.generate-section {
			margin: 0;
		}
		
		.header-section {
			padding-bottom: 1rem;
			margin-bottom: 1rem;
		}
		
		.template-selector {
			max-width: none;
		}
	}

	.checkbox-label {
		flex-direction: row !important;
		align-items: center;
		cursor: pointer;
	}

	.checkbox-label input[type="checkbox"] {
		width: auto !important;
		margin-right: 0.5rem;
		margin-bottom: 0 !important;
	}

	.error-message {
		margin-top: 1rem;
		padding: 0.75rem;
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #EF4444;
		background-color: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	.snackbar {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		max-width: 400px;
		width: calc(100% - 2rem);
	}

	.snackbar-content {
		background: linear-gradient(135deg, #10B981 0%, #059669 100%);
		color: white;
		padding: 1rem 1.5rem;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.snackbar-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.snackbar-text {
		flex: 1;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.snackbar-close {
		background: none;
		border: none;
		color: white;
		font-size: 1.25rem;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 4px;
		transition: background-color 0.2s ease;
		flex-shrink: 0;
	}

	.snackbar-close:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	@media (max-width: 768px) {
		.form-section {
			padding: 1rem;
			margin: 0;
			border-left: none;
			border-right: none;
			border-radius: 0;
		}
		
		.main-grid {
			gap: 1rem;
			margin: 0;
		}

		.form-grid {
			gap: 1rem;
		}

		.form-group.col-span-full {
			grid-column: span 1;
		}
		
		.mobile-header {
			margin-bottom: 1rem !important;
		}
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		.form-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* File Upload Styles */
	.upload-section {
		max-width: 100%;
	}

	.upload-area {
		border: 2px dashed rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		cursor: pointer;
		transition: all 0.3s ease;
		background: rgba(255, 255, 255, 0.02);
		position: relative;
		overflow: hidden;
	}

	.upload-area:hover {
		border-color: rgba(59, 130, 246, 0.5);
		background: rgba(59, 130, 246, 0.05);
		transform: translateY(-2px);
	}

	.upload-area.drag-over {
		border-color: #3B82F6;
		background: rgba(59, 130, 246, 0.1);
		transform: scale(1.02);
	}

	.upload-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
		opacity: 0.7;
	}

	.upload-text {
		color: white;
		font-size: 1rem;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	.upload-link {
		color: #3B82F6;
		text-decoration: underline;
		cursor: pointer;
	}

	.upload-hint {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.875rem;
		margin: 0;
	}

	.file-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.uploaded-file {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(16, 185, 129, 0.1);
		border: 1px solid rgba(16, 185, 129, 0.3);
		border-radius: 8px;
		padding: 1rem;
		text-align: left;
	}

	.file-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex: 1;
	}

	.file-icon {
		font-size: 1.5rem;
	}

	.file-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.file-name {
		color: white;
		font-weight: 500;
		font-size: 0.875rem;
	}

	.file-size {
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.75rem;
	}

	.remove-file-btn {
		background: rgba(239, 68, 68, 0.2);
		border: 1px solid rgba(239, 68, 68, 0.4);
		border-radius: 6px;
		color: #EF4444;
		padding: 0.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		font-weight: bold;
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-file-btn:hover {
		background: rgba(239, 68, 68, 0.3);
		transform: scale(1.1);
	}

	@media (max-width: 768px) {
		.upload-area {
			padding: 1.5rem 1rem;
		}
		
		.upload-icon {
			font-size: 2rem;
			margin-bottom: 0.75rem;
		}
		
		.upload-text {
			font-size: 0.875rem;
		}
		
		.file-info {
			gap: 0.5rem;
		}
		
		.uploaded-file {
			padding: 0.75rem;
		}
	}

	/* Generate Button Styles */
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

	.generate-btn.loading {
		background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
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

	.generate-section {
		text-align: center;
	}

	@media (max-width: 768px) {
		.generate-btn {
			width: 100%;
			padding: 1rem;
			font-size: 0.875rem;
		}
	}
</style>

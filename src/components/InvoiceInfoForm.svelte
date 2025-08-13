<script lang="ts">
	export let formData: any;
</script>

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

<style>
	.form-section {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		padding: 1.5rem;
		backdrop-filter: blur(10px);
	}

	.section-title {
		color: white;
		font-size: 1.1rem;
		font-weight: 600;
		margin-bottom: 1.5rem;
		padding-bottom: 0.75rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}



	.form-group label {
		color: white;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.form-group input,
	.comment-textarea {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		color: white;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.form-group input:focus,
	.comment-textarea:focus {
		outline: none;
		border-color: #3B82F6;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.form-group input::placeholder,
	.comment-textarea::placeholder {
		color: rgba(255, 255, 255, 0.4);
	}

	.checkbox-section {
		margin-bottom: 1.5rem;
	}

	.checkbox-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.checkbox-label {
		display: flex;
		flex-direction: row !important;
		align-items: center;
		cursor: pointer;
		color: white;
		font-size: 0.875rem;
		gap: 0.5rem;
	}

	.checkbox-label input[type="checkbox"] {
		width: auto !important;
		margin: 0;
		margin-right: 0.5rem;
	}

	.comment-textarea {
		width: 100%;
		min-height: 100px;
		resize: vertical;
		font-family: inherit;
	}

	.mt-6 {
		margin-top: 1.5rem;
	}

	@media (max-width: 768px) {
		.form-section {
			padding: 1rem;
			margin: 0;
			border-left: none;
			border-right: none;
			border-radius: 0;
		}
		
		.form-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.checkbox-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (min-width: 768px) and (max-width: 1023px) {
		.form-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.form-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
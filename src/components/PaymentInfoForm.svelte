<script lang="ts">
	export let formData: any;
</script>

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

	.form-group input {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		color: white;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.form-group input:focus {
		outline: none;
		border-color: #3B82F6;
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
	}

	.form-group input::placeholder {
		color: rgba(255, 255, 255, 0.4);
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
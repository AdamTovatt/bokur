<script lang="ts">
	export let formData: any;
</script>

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

	.form-group.col-span-full {
		grid-column: 1 / -1;
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

		.form-group.col-span-full {
			grid-column: span 1;
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
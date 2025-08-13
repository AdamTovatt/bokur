<script lang="ts">
	import { onMount } from 'svelte';
	import { Color } from '../../constants';
	import { pageTitle } from '$lib/store';
	
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import Panel from '../../components/Panel.svelte';
	import TemplateSelector from '../../components/TemplateSelector.svelte';
	import FileUpload from '../../components/FileUpload.svelte';
	import InvoiceInfoForm from '../../components/InvoiceInfoForm.svelte';
	import ReceiverInfoForm from '../../components/ReceiverInfoForm.svelte';
	import SenderInfoForm from '../../components/SenderInfoForm.svelte';
	import PaymentInfoForm from '../../components/PaymentInfoForm.svelte';
	import GenerateButton from '../../components/GenerateButton.svelte';
	import SuccessSnackbar from '../../components/SuccessSnackbar.svelte';
	import ErrorToast from '../../components/ErrorToast.svelte';

	let selectedTemplate = '';
	let uploadedFile: File | null = null;
	let showSuccessSnackbar = false;
	let successMessage = '';
	let showErrorToast = false;
	let errorMessage = '';

	function handleError(event: CustomEvent<string>) {
		errorMessage = event.detail;
		showErrorToast = true;
	}

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

	onMount(() => {
		pageTitle.set('Invoice Generator');
	});
</script>

<VerticalSpacing height={1} />

<!-- Invoice Configuration -->
<Panel backgroundColor={Color.Depth3}>
	<div class="header-section">
		<h3 class="text-lg font-semibold text-white mb-4 mobile-header">📋 Invoice Configuration</h3>
		
		<TemplateSelector 
			bind:selectedTemplate 
			bind:formData 
			bind:showSuccessSnackbar 
			bind:successMessage 
			on:error={handleError}
		/>
		
		<FileUpload 
			bind:uploadedFile 
			on:error={handleError}
		/>
	</div>
	
	<div class="main-grid">
		<!-- Left Column: Invoice & Receiver Info -->
		<div class="space-y-6">
			<InvoiceInfoForm bind:formData />
			<ReceiverInfoForm bind:formData />
		</div>

		<!-- Right Column: Sender & Payment Info -->
		<div class="space-y-6">
			<SenderInfoForm bind:formData />
			<PaymentInfoForm bind:formData />
		</div>
	</div>
</Panel>

<VerticalSpacing height={1} />

<!-- Generate Button -->
<Panel backgroundColor={Color.Depth3}>
	<GenerateButton 
		bind:formData 
		bind:uploadedFile 
		on:error={handleError}
	/>
</Panel>

<!-- Success Snackbar -->
<SuccessSnackbar 
	bind:showSnackbar={showSuccessSnackbar} 
	bind:message={successMessage} 
/>

<!-- Error Toast -->
<ErrorToast 
	bind:showToast={showErrorToast} 
	bind:message={errorMessage} 
/>

<style>
	.header-section {
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	:global(.space-y-6 > * + *) {
		margin-top: 1.5rem;
	}

	@media (min-width: 1024px) {
		.main-grid {
			grid-template-columns: 1fr 1fr;
			gap: 3rem;
		}
	}

	@media (max-width: 768px) {
		.header-section {
			padding-bottom: 1rem;
			margin-bottom: 1rem;
		}
		
		.main-grid {
			gap: 1rem;
			margin: 0;
		}

		.mobile-header {
			margin-bottom: 1rem !important;
		}
	}
</style>
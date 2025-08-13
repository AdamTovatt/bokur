<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let selectedTemplate = '';
	export let formData: any;
	export let showSuccessSnackbar = false;
	export let successMessage = '';

	const dispatch = createEventDispatcher();

	let templates = [
		{ id: '', name: 'Select a template...' }
	];
	let templatesLoading = true;

	async function loadTemplate(templateId: string) {
		if (!templateId) return;
		
		try {
			const response = await fetch(`/templates/${templateId}.json`);
			if (!response.ok) throw new Error('Template not found');
			
			const template = await response.json();
			
			formData = {
				invoiceInformation: { ...template.invoiceInformation },
				generalInformation: { ...template.generalInformation }
			};
			
			successMessage = `Template "${template.name}" loaded successfully!`;
			showSuccessSnackbar = true;
			
			setTimeout(() => {
				showSuccessSnackbar = false;
			}, 3000);
		} catch (e) {
			dispatch('error', 'Failed to load template: ' + (e instanceof Error ? e.message : String(e)));
		}
	}

	function handleTemplateChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		loadTemplate(target.value);
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
		loadAvailableTemplates();
	});
</script>

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

<style>
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
		.template-selector {
			max-width: none;
		}
	}
</style>
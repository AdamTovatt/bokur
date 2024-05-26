<script lang="ts">
	import { generatePdf } from '$lib/api';
	import BokurButton from '../../components/BokurButton.svelte';
	import FilePicker from '../../components/FilePicker.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import { Color } from '../../constants';

	let uploadedFile: File;
	let jsonInput: string;

	let errorMessage = '';

	async function fileWasChosen(file: File, fileName: string) {
		console.log('upload file');
		uploadedFile = file;
	}

	async function handleGeneratePdf() {
		if (!uploadedFile) {
			errorMessage = 'No file uploaded';
			return;
		}

		if (!jsonInput) {
			errorMessage = 'No json input';
			return;
		}
		errorMessage = '';
		console.log('generate pdf');
		console.log(jsonInput);
		console.log(uploadedFile);
		await generatePdf(uploadedFile, jsonInput);
		console.log('done!');
	}
</script>

<VerticalSpacing height={1} />
<FilePicker authorizedExtensions={['.txt', '.csv']} onFilePicked={fileWasChosen} />
<VerticalSpacing height={1} />
<div style="color: {Color.White}">Json</div>
<textarea
	style="background-color: {Color.Depth3}; color: {Color.White}; font-family: consolas"
	bind:value={jsonInput}
/>
<VerticalSpacing height={1} />
<BokurButton onClick={handleGeneratePdf} backgroundColor={Color.Depth4}>Generate pdf</BokurButton>
{#if errorMessage}
	<p style="color: {Color.Error}">{errorMessage}</p>
{/if}

<style>
	textarea {
		width: 100%;
		height: 100%;
		border-radius: 12px;
		user-select: none;
		padding: 0.5rem;
	}
</style>

<script lang="ts">
	import { BorderRadius, Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	export let onFilePicked: (file: File, fileName: string) => void;

	export let authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.*'];

	let file: File;
	let fileName: string;
	let fileExtension: string;

	function handleFileInputChange(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		const selectedFile = fileInput.files?.[0];
		if (selectedFile) {
			file = selectedFile;
			fileName = file.name.split('.')[0];
			fileExtension = file.name.split('.')[1];
		}
	}
</script>

<button
	style="background-color: {Color.Depth2}; padding: 2rem; border-radius: {BorderRadius.Default}; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); cursor: default;"
	on:click={(event) => {
		event.stopPropagation();
	}}
>
	<input
		style="color: {Color.White}"
		type="file"
		id="file"
		name="fileToUpload"
		accept={authorizedExtensions.join(',')}
		required
		on:change={handleFileInputChange}
	/>
	<VerticalSpacing height={2} />
	<div
		style="width: 100%; display: flex; flex-direction: row; justify-content: flex-start; color: {Color.White}"
	>
		<div>Custom file name:</div>
	</div>
	<input
		type="text"
		style="background-color: {Color.Depth3}; padding: 0.5rem; padding-left: 1rem; padding-right: 1rem; border-radius: {BorderRadius.Small}; width: 100%; color: {Color.White};"
		bind:value={fileName}
	/>
	<VerticalSpacing height={2} />
	<BokurButton
		onClick={() => {
			onFilePicked(file, fileName + '.' + fileExtension);
		}}
	>
		<div style="color: {Color.White}">Upload</div>
	</BokurButton>
</button>

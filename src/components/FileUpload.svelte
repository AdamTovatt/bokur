<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	export let uploadedFile: File | null = null;
	
	let isDragOver = false;
	const dispatch = createEventDispatcher();

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && validateFile(file)) {
			uploadedFile = file;
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
			dispatch('error', 'Please upload a CSV file from Clockify');
			return false;
		}
		if (file.size > 10 * 1024 * 1024) { // 10MB limit
			dispatch('error', 'File size must be less than 10MB');
			return false;
		}
		return true;
	}

	function removeFile() {
		uploadedFile = null;
	}
</script>

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

<style>
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
</style>
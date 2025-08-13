<script lang="ts">
	import { fly } from 'svelte/transition';

	export let showSnackbar = false;
	export let message = '';

	function closeSnackbar() {
		showSnackbar = false;
	}
</script>

{#if showSnackbar}
	<div class="snackbar" transition:fly={{ y: 50, duration: 300 }}>
		<div class="snackbar-content">
			<div class="snackbar-icon">✅</div>
			<div class="snackbar-text">{message}</div>
			<button class="snackbar-close" on:click={closeSnackbar}>✕</button>
		</div>
	</div>
{/if}

<style>
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
</style>
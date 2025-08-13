<script lang="ts">
	import { fly } from 'svelte/transition';

	export let showToast = false;
	export let message = '';

	function closeToast() {
		showToast = false;
	}

	// Auto-hide after 5 seconds
	$: if (showToast && message) {
		setTimeout(() => {
			showToast = false;
		}, 5000);
	}
</script>

{#if showToast}
	<div class="error-toast" transition:fly={{ y: 50, duration: 300 }}>
		<div class="toast-content">
			<div class="toast-icon">❌</div>
			<div class="toast-text">{message}</div>
			<button class="toast-close" on:click={closeToast}>✕</button>
		</div>
	</div>
{/if}

<style>
	.error-toast {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
		max-width: 400px;
		width: calc(100% - 2rem);
	}

	.toast-content {
		background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
		color: white;
		padding: 1rem 1.5rem;
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.toast-icon {
		font-size: 1.25rem;
		flex-shrink: 0;
	}

	.toast-text {
		flex: 1;
		font-weight: 500;
		font-size: 0.875rem;
		line-height: 1.4;
	}

	.toast-close {
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

	.toast-close:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
</style>
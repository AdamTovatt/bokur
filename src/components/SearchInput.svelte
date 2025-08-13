<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Color } from '../constants';

	const dispatch = createEventDispatcher();

	export let searchQuery: string = '';
	export let placeholder: string = 'Search transactions...';

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		searchQuery = target.value;
		dispatch('search', searchQuery);
	}

	function clearSearch() {
		searchQuery = '';
		dispatch('search', searchQuery);
	}
</script>

<div 
	class="search-container p-4 rounded-lg mb-4"
	style="background-color: {Color.Depth3};"
>
	<div class="flex items-center space-x-2">
		<div class="relative flex-1">
			<input
				type="text"
				{placeholder}
				value={searchQuery}
				on:input={handleInput}
				class="w-full px-3 py-2 rounded text-white text-sm"
				style="background-color: {Color.Depth4};"
			/>
			{#if searchQuery}
				<button
					class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
					on:click={clearSearch}
				>
					✕
				</button>
			{/if}
		</div>
	</div>
	
	{#if searchQuery}
		<div class="mt-2 text-xs text-gray-300">
			Searching for: "{searchQuery}"
		</div>
	{/if}
</div>

<style>
	input::placeholder {
		color: #9CA3AF;
	}
	
	input:focus {
		outline: none;
		box-shadow: 0 0 0 2px #3B82F6;
	}
</style>
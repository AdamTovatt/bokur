<script lang="ts">
	import { Color } from '../constants';

	export let size: number = 1;
	export let color: string = Color.White;
</script>

<div class="text-container" style="color: {color}; font-size: {size}rem">
	<slot />
</div>

<style>
	.text-container {
	}
</style>

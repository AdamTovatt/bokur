<script lang="ts">
	export let maxWidth: number = 60;
</script>

<div class="container" style="max-width: {maxWidth}rem">
	<slot />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>

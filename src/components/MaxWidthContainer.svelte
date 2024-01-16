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
		align-items: center;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1rem;
		padding-right: 1rem;
	}
</style>

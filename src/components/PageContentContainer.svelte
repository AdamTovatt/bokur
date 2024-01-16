<script lang="ts">
	export let margin: number = 1;
</script>

<div style="margin-left: {margin}rem; margin-right: {margin}rem;"><slot /></div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>

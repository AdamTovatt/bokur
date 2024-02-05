<script lang="ts">
	export let margin: number = 1;
</script>

<div style="margin-left: {margin}rem; margin-right: {margin}rem;"><slot /></div>

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100vh;
		padding-top: 2rem;
		padding-bottom: 5rem;
	}
</style>

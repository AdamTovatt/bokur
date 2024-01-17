<script lang="ts">
	import { Color } from '../constants';

	export let leftColumn: string;
	export let rightColumn: string;
	export let color: string = Color.White;
	export let padding: number = 0.5;
</script>

<div class="container" style="color: {color}">
	<div style="padding-left: {padding}rem">{leftColumn}</div>
	<div style="padding-right: {padding}rem">{rightColumn}</div>
</div>

<style>
	.container {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-weight: 300;
	}
</style>

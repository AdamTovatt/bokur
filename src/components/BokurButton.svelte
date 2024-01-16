<script lang="ts">
	import { Color } from '../constants';

	export let text: string = 'Click me';
	export let onClick: () => void;
	export let backgroundColor: string = Color.Depth3;
	export let color: string = Color.White;
	export let fontSize: number = 1;
</script>

<button
	on:click={onClick}
	style="background-color: {backgroundColor}; color: {color}; font-size: {fontSize}rem;"
	>{text}</button
>

<style>
	button {
		flex: 1;
		width: 100%;
		padding-top: 1rem;
		padding-bottom: 1rem;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		font-family: 'Jost';

		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		transition:
			box-shadow 0.01s,
			transform 0.01s;
	}

	button:hover {
		box-shadow: 0px 6px 7px 0px rgba(0, 0, 0, 0.25);
		transform: scale(1.005) translateY(-2px);
	}
</style>

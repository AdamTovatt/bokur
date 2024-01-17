<script lang="ts">
	import { BorderRadius } from '../constants';

	export let backgroundColor: string;
	export let center: boolean = false;
	export let flexDirection: 'row' | 'column' = 'column';
</script>

<div
	class="panel"
	style="background-color: {backgroundColor}; border-radius: {BorderRadius.Default}; align-items: {center
		? 'center'
		: 'flex-start'}; flex-direction: {flexDirection};"
>
	<slot />
</div>

<style>
	.panel {
		display: flex;
		width: 100%;
		flex: 1;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		padding: 1rem;
	}
</style>

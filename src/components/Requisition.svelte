<script lang="ts">
	import { createRequisition, getRequisitionDaysLeft } from '$lib/api';
	import { token } from '$lib/store';
	import type { ApiResponse } from '$lib/types';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import BokurButton from './BokurButton.svelte';
	import HorizontalSpacing from './HorizontalSpacing.svelte';

	import Panel from './Panel.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	let requisitionDaysLeft: number;

	let didCreateNewRequisition = false;
	let creationResult: string;

	async function initialize() {
		requisitionDaysLeft = await getRequisitionDaysLeft();
	}

	async function createNewRequisition() {
		let response: ApiResponse = await createRequisition();

		didCreateNewRequisition = response.success;
		creationResult = response.message;
	}

	$: {
		if ($token) {
			initialize();
		}
	}
</script>

<Panel backgroundColor={Color.Depth2} center={true} flexDirection="row">
	<VerticalSpacing height={1.5} />
	<p class="text-white font-light" style="color: {Color.White}">
		{requisitionDaysLeft ? requisitionDaysLeft : '(loading)'} days left on requisition
	</p>
	<HorizontalSpacing width={1.5} />
	{#if !creationResult}
		<BokurButton
			onClick={() => {
				createNewRequisition();
			}}>Create new</BokurButton
		>
	{:else if didCreateNewRequisition}
		<a href={creationResult} style="width: 100%;"
			><BokurButton hasBorder={true} onClick={() => {}}>Open requisition</BokurButton></a
		>
	{:else}
		<p style="padding-top: 1rem; padding-bottom: 1rem; color: {Color.White}">{creationResult}</p>
	{/if}
</Panel>

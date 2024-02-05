<script lang="ts">
	import { getRequisitionDaysLeft } from '$lib/api';
	import { Color } from '../constants';
	import { routeToPage } from '../functions/routing';
	import BokurButton from './BokurButton.svelte';
	import HorizontalSpacing from './HorizontalSpacing.svelte';

	import Panel from './Panel.svelte';
	import TextContainer from './TextContainer.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	let requisitionDaysLeft: number;

	async function initialize() {
		requisitionDaysLeft = await getRequisitionDaysLeft();
	}

	$: {
		initialize();
	}
</script>

<Panel backgroundColor={Color.Depth2} center={true} flexDirection="row">
	<VerticalSpacing height={1.5} />
	<p class="text-white font-light">
		{requisitionDaysLeft ? requisitionDaysLeft : '(loading)'} days left on requisition
	</p>
	<HorizontalSpacing width={1.5} />
	<BokurButton
		onClick={() => {
			routeToPage('', false);
		}}>Create new</BokurButton
	>
</Panel>

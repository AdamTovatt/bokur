<script lang="ts">
	import { Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	export let label: string; // Input property for label
	export let onClick: () => void; // Input property for onClick function
	export let hasBorder: boolean = false; // Input property for highlight
	export let buttonText: string; // Input property for buttonText
</script>

<div style="width: 100%">
	<p style="color: ${Color.White}; font-weight: 300; font-size: 0.9rem;">{label}</p>
	<VerticalSpacing height={0.5} />
	<BokurButton
		fontSize={0.9}
		padding={0.75}
		additionalStyling={'font-weight: 300;'}
		{hasBorder}
		backgroundColor={Color.Depth4}
		{onClick}>{buttonText}</BokurButton
	>
</div>

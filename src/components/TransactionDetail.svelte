<script lang="ts">
	import { Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';
	import TrashIcon from '../icons/TrashIcon.svelte';
	import HorizontalSpacing from './HorizontalSpacing.svelte';

	export let label: string; // Input property for label
	export let onClick: () => void; // Input property for onClick function
	export let onWantsToDelete: (() => void) | null = null; // Input property for onWantsToDelete function
	export let hasBorder: boolean = false; // Input property for highlight
	export let buttonText: string; // Input property for buttonText
	export let showDeleteButton: boolean = false; // Input property for showDeleteButton
</script>

<div style="width: 100%">
	<p style="color: ${Color.White}; font-weight: 300; font-size: 0.9rem;">{label}</p>
	<VerticalSpacing height={0.5} />
	<div style="display: flex;">
		<VerticalSpacing height={0.5} />
		{#if showDeleteButton}
			<div>
				<BokurButton
					fontSize={0.9}
					padding={0.75}
					additionalStyling={'font-weight: 300;'}
					hasBorder={true}
					borderColor={Color.Error}
					backgroundColor={Color.Depth4}
					onClick={() => {
						if (onWantsToDelete !== null) onWantsToDelete();
					}}><TrashIcon /></BokurButton
				>
			</div>
			<HorizontalSpacing width={1} />
		{/if}
		<BokurButton
			fontSize={0.9}
			padding={0.75}
			additionalStyling={'font-weight: 300;'}
			{hasBorder}
			backgroundColor={Color.Depth4}
			{onClick}>{buttonText}</BokurButton
		>
	</div>
</div>

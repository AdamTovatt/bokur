<script lang="ts">
	import { getAccountSummaries } from '$lib/api';
	import { token } from '$lib/store';
	import type { AccountValueInformation } from '$lib/types';
	import { Color } from '../constants';
	import Panel from './Panel.svelte';
	import TextContainer from './TextContainer.svelte';
	import TwoColumnsRow from './TwoColumnsRow.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	// Explicitly specify the type of accountsInformation
	export let accountsInformation: AccountValueInformation[] | null = null;

	async function runAsyncStartupFunctions() {
		accountsInformation = await getAccountSummaries();
	}

	$: {
		if ($token) {
			runAsyncStartupFunctions();
		}
	}
</script>

<Panel backgroundColor={Color.Depth3} center={true}>
	<VerticalSpacing height={1} />
	<TextContainer>Accounts</TextContainer>
	<VerticalSpacing height={1.5} />
	{#if accountsInformation}
		{#each accountsInformation as summary}
			<TwoColumnsRow leftColumn={summary.account.name} rightColumn={summary.balance.toString()}
			></TwoColumnsRow>
		{/each}
	{:else}
		<TextContainer>(loading)</TextContainer>
	{/if}
	<VerticalSpacing height={1} />
	<TwoColumnsRow leftColumn={'Total'} rightColumn={'79 932 kr'}></TwoColumnsRow>
	<VerticalSpacing height={0.5} />
</Panel>

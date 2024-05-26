<script lang="ts">
	import VerticalSpacing from '../components/VerticalSpacing.svelte';
	import AccountsSummaryPanel from '../components/AccountsSummaryPanel.svelte';
	import { pageTitle, token } from '$lib/store';
	import auth from '$lib/authService';
	import { getAllAccounts, getAllThatRequiresAction, getRequisitionDaysLeft } from '$lib/api';
	import { onMount } from 'svelte';
	import Requisition from '../components/Requisition.svelte';
	import ActionRequired from '../components/ActionRequired.svelte';
	import BokurButton from '../components/BokurButton.svelte';
	import type { Transaction } from '$lib/types';
	import { routeToPage } from '../functions/routing';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';

	let transactionsThatRequireAction: Transaction[];

	function logout() {
		auth.logout();
	}

	async function initialize() {
		getAllAccounts();
		transactionsThatRequireAction = await getAllThatRequiresAction();
	}

	$: {
		if ($token) {
			initialize();
		}
	}

	onMount(() => {
		pageTitle.set('Dashboard');
	});
</script>

<MaxWidthContainer maxWidth={30}>
	<VerticalSpacing height={1} />
	<AccountsSummaryPanel />
	<VerticalSpacing height={1} />
	<Requisition />
	<VerticalSpacing height={1} />
	{#if transactionsThatRequireAction && transactionsThatRequireAction.length > 0}
		<ActionRequired transactions={transactionsThatRequireAction} />
	{:else}
		<BokurButton
			onClick={() => {
				routeToPage('transactions');
			}}
			>Go to transactions
		</BokurButton>
	{/if}
	<ActionRequired />
	<VerticalSpacing height={1} />
	<div class="h-4" />
	<BokurButton onClick={logout}>Logout</BokurButton>
	<VerticalSpacing height={5} />
</MaxWidthContainer>

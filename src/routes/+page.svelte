<script lang="ts">
	import VerticalSpacing from '../components/VerticalSpacing.svelte';
	import AccountsSummaryPanel from '../components/AccountsSummaryPanel.svelte';
	import { pageTitle, token } from '$lib/store';
	import auth from '$lib/authService';
	import { getAllAccounts, getRequisitionDaysLeft } from '$lib/api';
	import { onMount } from 'svelte';
	import Requisition from '../components/Requisition.svelte';
	import ActionRequired from '../components/ActionRequired.svelte';
	import BokurButton from '../components/BokurButton.svelte';

	function logout() {
		auth.logout();
	}

	async function initialize() {
		getAllAccounts();
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

<AccountsSummaryPanel />
<VerticalSpacing height={1} />
<Requisition />
<ActionRequired />
<div class="h-4" />
<BokurButton onClick={logout}>Logout</BokurButton>

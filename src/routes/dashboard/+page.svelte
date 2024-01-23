<script lang="ts">
	import BokurButton from '../../components/BokurButton.svelte';
	import MaxWidthContainer from '../../components/MaxWidthContainer.svelte';
	import PageContentContainer from '../../components/PageContentContainer.svelte';
	import Panel from '../../components/Panel.svelte';
	import TextContainer from '../../components/TextContainer.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import HorizontalSpacing from '../../components/HorizontalSpacing.svelte';
	import AccountsSummaryPanel from '../../components/AccountsSummaryPanel.svelte';
	import { Color } from '../../constants';
	import { routeToPage } from '../../functions/routing';
	import type { PageData } from './$types';
	import { token } from '$lib/store';
	import auth from '$lib/authService';
	import { getAllAccounts, getRequisitionDaysLeft } from '$lib/api';
	import Taskbar from '../../components/Taskbar.svelte';

	export let data: PageData;

	function logout() {
		auth.logout();
	}
	console.log($token);

	let requisitionDaysLeft: number;

	async function runAsyncStartupFunctions() {
		requisitionDaysLeft = await getRequisitionDaysLeft();
		getAllAccounts();
	}

	$: {
		runAsyncStartupFunctions();
	}
</script>

<Taskbar />
<PageContentContainer>
	<MaxWidthContainer maxWidth={25}>
		<AccountsSummaryPanel />
		<VerticalSpacing height={1} />
		<Panel backgroundColor={Color.Depth2} center={true} flexDirection="row">
			<VerticalSpacing height={1.5} />
			<TextContainer
				>{requisitionDaysLeft ? requisitionDaysLeft : '(loading)'} days left on requisition</TextContainer
			>
			<HorizontalSpacing width={1.5} />
			<BokurButton
				backgroundColor={Color.Depth3}
				text="Create new"
				onClick={() => {
					routeToPage('', false);
				}}
			/>
		</Panel>
		<button on:click={logout} class="btn btn-primary mt-4">logout</button>
	</MaxWidthContainer>
</PageContentContainer>

<script lang="ts">
	import BokurButton from '../../components/BokurButton.svelte';
	import MaxWidthContainer from '../../components/MaxWidthContainer.svelte';
	import PageContentContainer from '../../components/PageContentContainer.svelte';
	import Panel from '../../components/Panel.svelte';
	import TextContainer from '../../components/TextContainer.svelte';
	import VerticalSpacing from '../../components/VerticalSpacing.svelte';
	import HorizontalSpacing from '../../components/HorizontalSpacing.svelte';
	import TwoColumnsRow from '../../components/TwoColumnsRow.svelte';
	import { Color } from '../../constants';
	import { routeToPage } from '../../functions/routing';
	import type { PageData } from './$types';
	import { token } from '$lib/store';
	import auth from '$lib/authService';

	export let data: PageData;

	const fetchData = () => {
		fetch('https://sakurapi.se/bokur/Account/get-all', {
			headers: {
				Authorization: 'Bearer ' + $token
			}
		});
	};
	function logout() {
		auth.logout();
	}
	console.log($token);
</script>

<PageContentContainer>
	<MaxWidthContainer maxWidth={25}>
		<Panel backgroundColor={Color.Depth3} center={true}>
			<VerticalSpacing height={1} />
			<TextContainer>Accounts</TextContainer>
			<VerticalSpacing height={1.5} />
			<TwoColumnsRow leftColumn={'Oliver'} rightColumn={'20 kr'}></TwoColumnsRow>
			<TwoColumnsRow leftColumn={'Adam'} rightColumn={'12 kr'}></TwoColumnsRow>
			<TwoColumnsRow leftColumn={'Shared'} rightColumn={'79 900 kr'}></TwoColumnsRow>
			<VerticalSpacing height={1} />
			<TwoColumnsRow leftColumn={'Total'} rightColumn={'79 932 kr'}></TwoColumnsRow>
			<VerticalSpacing height={0.5} />
		</Panel>
		<VerticalSpacing height={1} />
		<Panel backgroundColor={Color.Depth2} center={true} flexDirection="row">
			<VerticalSpacing height={1.5} />
			<TextContainer>34 days left on requisition</TextContainer>
			<HorizontalSpacing width={1.5} />
			<BokurButton
				backgroundColor={Color.Depth3}
				text="Create new"
				onClick={() => {
					routeToPage('', false);
				}}
			/>
		</Panel>
		<button on:click={fetchData} class="btn btn-primary mt-4">Fetch data</button>
		<button on:click={logout} class="btn btn-primary mt-4">logout</button>
	</MaxWidthContainer>
</PageContentContainer>

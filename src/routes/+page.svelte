<script lang="ts">
	import BokurButton from '../components/BokurButton.svelte';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import TextContainer from '../components/TextContainer.svelte';
	import VerticalSpacing from '../components/VerticalSpacing.svelte';
	import auth from '$lib/authService';
	import { isAuthenticated } from '$lib/store';
	import { routeToPage } from '../functions/routing';

	$: if ($isAuthenticated) {
		routeToPage('dashboard', false);
	}
	function login() {
		auth.login();
	}
</script>

<PageContentContainer>
	<MaxWidthContainer maxWidth={20}>
		<TextContainer>You have to be logged in to view this page</TextContainer>
		<VerticalSpacing height={1.5} />
		<BokurButton
			text="Login"
			onClick={() => {
				login();
			}}
		/>
	</MaxWidthContainer>
</PageContentContainer>

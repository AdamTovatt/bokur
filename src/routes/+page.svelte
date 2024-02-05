<script lang="ts">
	import BokurButton from '../components/BokurButton.svelte';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import TextContainer from '../components/TextContainer.svelte';
	import VerticalSpacing from '../components/VerticalSpacing.svelte';
	import auth from '$lib/authService';
	import { isAuthenticated } from '$lib/store';
	import { routeToPage } from '../functions/routing';
	import { Color } from '../constants';

	$: if ($isAuthenticated) {
		routeToPage('dashboard', false);
	}
	function login() {
		auth.login();
	}
</script>

<TextContainer>You have to be logged in to view this page</TextContainer>
<VerticalSpacing height={1.5} />
<BokurButton
	onClick={() => {
		login();
	}}
	backgroundColor={Color.Depth4}>Login</BokurButton
>

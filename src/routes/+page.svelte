<script lang="ts">
	import BokurButton from '../components/BokurButton.svelte';
	import MaxWidthContainer from '../components/MaxWidthContainer.svelte';
	import PageContentContainer from '../components/PageContentContainer.svelte';
	import TextContainer from '../components/TextContainer.svelte';
	import VerticalSpacing from '../components/VerticalSpacing.svelte';
	import { routeToPage } from '../functions/routing';
</script>

<PageContentContainer>
	<MaxWidthContainer maxWidth={20}>
		<TextContainer>You have to be logged in to view this page</TextContainer>
		<VerticalSpacing height={1.5} />
		<BokurButton
			text="Login"
			onClick={() => {
				routeToPage('dashboard', false);
			}}
		/>
	</MaxWidthContainer>
</PageContentContainer>

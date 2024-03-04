<script>
	import auth from '$lib/authService';
	import { Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	import TextContainer from './TextContainer.svelte';
	import VerticalSpacing from './VerticalSpacing.svelte';

	function login() {
		auth.login();
	}
</script>

<VerticalSpacing height={1} />
<TextContainer>You have to be logged in to view this page</TextContainer>
<VerticalSpacing height={1.5} />
<BokurButton
	onClick={() => {
		login();
	}}
	backgroundColor={Color.Depth4}>Login</BokurButton
>

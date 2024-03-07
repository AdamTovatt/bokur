<script lang="ts">
	import type { Account } from '$lib/types';
	import { BorderRadius, Color } from '../constants';
	import BokurButton from './BokurButton.svelte';
	export let accounts: Account[]; // Input property for available accounts
	export let onClick: (account: Account) => void;
	export let useContainer = true;
</script>

<div
	style="
	{useContainer
		? `background-color: ${Color.Depth2}; padding: 2rem; border-radius: ${BorderRadius.Default}; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);`
		: ''}"
>
	{#each accounts as account, index}
		<BokurButton
			backgroundColor={Color.Depth4}
			marginBottom={index === accounts.length - 1 ? 0 : 1}
			onClick={() => {
				onClick(account);
			}}
		>
			<div style="color: {Color.White}">
				{account.name}
			</div>
		</BokurButton>
	{/each}
</div>

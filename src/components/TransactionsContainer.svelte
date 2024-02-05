<script>
	import { Color } from '../constants';
	export let title = 'Transactions';
	export let expanded = false;
</script>

<div class=" p-3 rounded-xl shadow-lg" style={`background-color: ${Color.Depth2}`}>
	<p class="text-center">{title}</p>
	<div
		class=" flex gap-4 flex-col overflow-y-scroll"
		style={`max-height: ${expanded ? '40' : '19'}rem;`}
	>
		<slot />
	</div>
</div>

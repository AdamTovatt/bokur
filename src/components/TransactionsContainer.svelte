<script>
	import { Color } from '../constants';
	export let title = 'Transactions';
	export let expanded = false;
</script>

<div class=" p-3 rounded-xl shadow-lg" style={`background-color: ${Color.Depth2}`}>
	<p class="text-center" style="color: ${Color.White}">{title}</p>
	<div
		class=" flex gap-2 flex-col overflow-y-scroll"
		style={`max-height: ${expanded ? 'calc(100vh - 25rem)' : 'calc(50vh - 6.5rem)'};`}
	>
		<slot />
	</div>
</div>

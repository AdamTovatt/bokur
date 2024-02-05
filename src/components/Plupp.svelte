<script>
	import { Color } from '../constants';

	export let value = 0;
</script>

<svg
	width="5"
	height="34"
	viewBox="0 0 5 34"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="position: absolute; right: 0; margin: auto 0; width: 5px;"
>
	<path
		d="M0 5C0 2.23858 2.23858 0 5 0V34C2.23858 34 0 31.7614 0 29V5Z"
		fill={value >= 0 ? Color.Success : Color.Error}
	/>
</svg>

<div><slot /></div>

<style>
	div {
		display: flex;
		flex-direction: column;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	
	@media (min-width: 768px) {
		div {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}
</style>

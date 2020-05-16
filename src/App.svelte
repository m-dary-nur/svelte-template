<script>		
	import { Container, Link, history } from "./components/Router"

	export let name

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	<nav>
		<Link to="/foo">Foo</Link>
		<Link to="/nested/bar">Bar</Link>
		<Link to="/other">Other</Link>
	</nav>	

	<Container />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	nav {
		list-style-type: none;
		margin-bottom: 1rem;
	}

	:global(.router-container) {
		overflow-x: hidden;
	}

	:global(.router-link) {
		padding: .5rem 1rem;
		color: #ff3e00;
		border-radius: .5rem;
	}

	:global(.router-link:visited) {
		color: #ff3e00;
	}

	:global(.router-link:hover) {
		background-color: #ff3e00;
		color: #fff;
		text-decoration: none;
	}
</style>
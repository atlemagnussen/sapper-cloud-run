<script context="module">
	export async function preload() {
		const tree = await this.fetch(`blog.json`).then(r => r.json());
		return { tree };
	}
</script>

<script>
	export let tree;
	import Nav from '../components/Nav.svelte';
	import TreeNode from '../components/TreeNode.svelte';
	export let segment;
</script>

<style>
	main {
		display: grid;
  		height: 100vh;
  		grid-template: auto 1fr auto / auto 1fr auto
	}
	header {
		padding: 2rem;
		grid-column: 1 / 4;
	}

	aside#left {
		grid-column: 1 / 2;
	}

	section#content {
		grid-column: 2 / 3;
	}

	aside#right {
		grid-column: 3 / 4;
	}
	footer {
		padding: 2rem;
		text-align: center;
		grid-column: 1 / 4;
	}
	aside.layout {
		padding: 1rem;
	}
	
	@media only screen and (max-width: 640px) {
		main {
			grid-template: unset;
			grid-template-rows: auto auto 1fr auto;
		}
		header {
			grid-column: auto;
		}

		aside#left {
			grid-column: auto;
		}

		section#content {
			grid-column: auto;
		}

		aside#right {
			display: none;
			grid-column:unset;
		}
		footer {
			grid-column: auto;
		}
	}
</style>

<main>
	<header>
		<Nav {segment}/>
	</header>

	<aside id="left" class="layout">
		<nav id="treeview" class="treeview">
			{#each tree.nodes as node}
				<TreeNode articleNode={node} config={tree.config} {segment}/>
			{/each}
		</nav>		
	</aside>

	<section id="content">
		<slot></slot>
	</section>
	
	<aside id="right" class="layout">
		Hello
	</aside>

	<footer>Footer</footer>
</main>
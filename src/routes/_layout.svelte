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
</style>

<main>
	<header>
		<Nav {segment}/>
	</header>

	<aside id="left">
		<nav id="treeview" class="treeview">
			{#each tree.nodes as node}
				<TreeNode articleNode={node} config={tree.config}/>
			{/each}
		</nav>		
	</aside>

	<section id="content">
		<slot></slot>
	</section>
	
	<aside id="right">
		
	</aside>

	<footer>Footer</footer>
</main>
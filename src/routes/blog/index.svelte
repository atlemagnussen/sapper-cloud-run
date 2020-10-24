<script context="module">
	export async function preload() {
		const tree = await this.fetch(`blog.json`).then(r => r.json());
		return { tree };
	}
</script>

<script>
	export let tree;
	import TreeNode from "../../components/TreeNode.svelte";
</script>

<style>
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<nav id="treeview" class="treeview">
    {#each tree.nodes as node}
        <TreeNode articleNode={node} config={tree.config}/>
    {/each}
</nav>

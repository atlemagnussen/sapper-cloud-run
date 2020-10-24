<script context="module">
	export function preload() {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { tree };
		});
	}
</script>

<script>
	export let tree;
	//import {articles} from '../../articles.js';
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each tree.nodes as article}
		{JSON.stringify(article)}
		<!-- <li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li> -->
	{/each}
</ul>

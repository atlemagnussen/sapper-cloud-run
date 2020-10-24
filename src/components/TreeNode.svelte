<script>
    export let articleNode;
    export let config;
    let spanNode;

    $: if (spanNode) css();

    const css = () => {
        if (!spanNode)
            return;
        if (articleNode.type && config.types && config.types.hasOwnProperty(articleNode.type)) {
            const type = this.config.types[articleNode.type];
            if (type.css) {
                const classes = type.css.split(' ');
                spanNode.classList.add(...classes);
            }
        } else if (articleNode.children) {
            spanNode.classList.add("icon", "icon-file-directory");
        } else {
            spanNode.classList.add("icon", "icon-file");
        }
    }
</script>
<style>
    details {
        margin-left: 1rem;
        cursor: pointer;
    }
    details.leaf > summary{
        list-style: none;
    }
    details.leaf > summary::-webkit-details-marker {
        display: none;
    }
    .node-text::before {
        margin-right: 0.5rem;
    }
    span.selected {
        background-color: var(--selected-color);;
    }
    summary:hover {
        background: var(--hover-color);
    }

    span.node-text.icon-file::before {
        color: var(--main-color);
    }
</style>

<details class:leaf="{!articleNode.children}" open={articleNode.expanded}>
    <summary id="{articleNode.id}">
        <span id="{articleNode.id}" bind:this={spanNode} class="node-text"> <!-- class:selected={$blogId == articleNode.id} -->
            
            {#if articleNode.children}
                {articleNode.name}
            {:else}
                <a href="blog/{articleNode.id}">{articleNode.name}</a>
            {/if}

        </span>
    </summary>
    {#if articleNode.children}
        {#each articleNode.children as child}
            <svelte:self articleNode={child} />
        {/each}
    {/if}
</details>

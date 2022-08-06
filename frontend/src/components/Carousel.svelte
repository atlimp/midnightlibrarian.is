<script lang="ts">
    import { onMount } from 'svelte';

    let Carousel;
    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
    });
</script>
<svelte:component this={Carousel}>
    <slot></slot>
</svelte:component>
<style>
    :global(.sc-carousel-button.sc-carousel-arrow__circle) {
        width: 2em !important;
        height: 2em !important;
    }
</style>
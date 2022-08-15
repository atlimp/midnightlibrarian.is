<script lang="ts">
    import type { CarouselOptions } from '$lib/interfaces';
    import { onMount } from 'svelte';

    let Carousel;
    onMount(async () => {
        const module = await import('svelte-carousel');
        Carousel = module.default;
    });
    
    export let options: CarouselOptions = {} as CarouselOptions;
</script>
<svelte:component 
    this={Carousel} 
    {...options}
>
    <slot></slot>
</svelte:component>
<style>
    :global(.sc-carousel-button.sc-carousel-arrow__circle) {
        width: 2em !important;
        height: 2em !important;
    }
    :global(.sc-carousel-dots__container) {
        padding: 1em 1em 0 1em !important;
    }
</style>
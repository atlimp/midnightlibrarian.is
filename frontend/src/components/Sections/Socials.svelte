<script lang='ts'>
    import type { Link } from '$lib/interfaces';
    import Icon from '../Icon.svelte';

    export let links: Link[];
</script>
<div class="grid place-items-center p-8 blur-2xs" id="socials">
    <h1 class="text-center py-32 text-lg lg:text-3xl pb-12 pt-24">
        Find us on social media
    </h1>
    <div class="flex gap-4 lg:gap-8 flex-wrap justify-center">
        {#each links as { site, svg, link }}
            <a href={link} class="basis-1/5 sm:basis-0">
                <Icon style="h-12 w-12 sm:h-16 sm:w-16 xl:h-20 xl:w-20 drop-shadow-icon blur-2xs fill-white cursor-pointer hover:drop-shadow-icon-orange hover:fill-orange focus:outline-0 transition-svg duration-75" name={site} svg={svg} />
            </a>
        {/each}
    </div>
</div>
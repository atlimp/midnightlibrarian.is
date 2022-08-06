<script lang='ts'>
    import type { Link, Config } from '$lib/interfaces';
    import Icon from '../Icon.svelte';
    import Doi from '../DateOfInterest.svelte';
    import Section from '../Section.svelte';
    
    export let config: Config;
    export let links: Link[];
    export let quote: string;

    let message = config.messageOfTheDay != "" ? config.messageOfTheDay : quote;
</script>
<Section styles="grid-rows-layout items-center" full>
    <main class="grid place-items-center gap-8 lg:gap-12 h-min">
        <Icon style="w-4/5 md:w-3/4 lg:max-w-[60%] xl:max-w-[45%] h-auto stroke-orange drop-shadow-logo blur-2xs focus:outline-0 animate-svg-glitch" name="Logo" />
        <div class="flex gap-4 lg:gap-8">
            {#each links as { site, svg, link }}
                <a href={link}>
                    <Icon style="h-12 w-12 sm:h-16 sm:w-16 xl:h-20 xl:w-20 drop-shadow-icon blur-2xs fill-white cursor-pointer hover:drop-shadow-icon-orange hover:fill-orange focus:outline-0 transition-svg duration-75" name={site} svg={svg} />
                </a>
            {/each}
        </div>
        <h1 class="w-4/5 xl:max-w-[50%] text-xl lg:text-2xl xl:text-3xl text-center">{message}</h1>
    </main>
    <div class='uppercase flex justify-between items-end'>
        <div></div>
        <Doi data={config.dateOfInterest}/>
    </div>
</Section>
<style>
    * {
        text-shadow: 0 0 0.5em white;
    }
</style>
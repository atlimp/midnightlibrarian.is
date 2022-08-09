<script lang='ts'>
    import type { Config } from '$lib/interfaces';
    import Icon from '../Icon.svelte';
    import Doi from '../DateOfInterest.svelte';
    import Section from '../Section.svelte';
    
    export let config: Config;
    export let quote: string;

    let message = config.messageOfTheDay != "" ? config.messageOfTheDay : quote;
</script>
<Section styles="grid-rows-layout items-center" full>
    <main class="grid place-items-center gap-8 lg:gap-12 h-min">
        <Icon style="w-4/5 md:w-3/4 lg:max-w-[60%] xl:max-w-[45%] h-auto stroke-orange drop-shadow-logo blur-2xs focus:outline-0 animate-svg-glitch" name="Logo" />
        <h1 class="w-4/5 xl:max-w-[50%] text-xl lg:text-2xl xl:text-3xl text-center">{message}</h1>
        <a class="text-lg md:text-xl lg:text-2xl py-4 block p-8 rounded-full border-solid border-2 w-fit m-auto transition-colors text-2xl my-8 hover:bg-orange" href="#socials">Socials</a>
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
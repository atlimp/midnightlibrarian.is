<script lang="ts">
    import type { Release } from "$lib/interfaces";
    import Button from "./Button.svelte";

    export let release: Release;
</script>
<div class="flex flex-col gap-8 md:gap-0 md:grid place-items-center md:grid-cols-3 md:grid-rows-[minmax(0,_1fr)_minmax(0,_1fr)_70px] h-fit xl:px-8">
    <img src={release.image} alt="Art" class="h-48 w-48 lg:h-60 lg:w-60 xl:h-80 xl:w-80 m-auto border-2 border-black border-solid rounded-lg md:row-span-3" />
    <div class="md:col-span-2 md:row-span-2 px-4 text-left w-full">
        <h2 class="text-2xl xl:text-4xl font-bold uppercase text-center md:text-left">{release.name} - {release.type}</h2>
        <div class="text-center md:text-left xl:text-lg">Released: {release.releaseDate.toLocaleDateString()}</div>
        <p class="uppercase text-lg xl:text-xl mt-1 xl:mt-2 text-justify">{release.description}</p>
    </div>
    <div class="flex w-full md:px-4 justify-center md:justify-start items-center gap-8 h-full col-span-2">
        {#each release.links as link }
            <Button text={link.site} link={link.link} rounded size="md" styles="capitalize"/>
        {/each}
    </div>
</div>
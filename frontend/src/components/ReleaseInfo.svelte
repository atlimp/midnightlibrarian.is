<script lang="ts">
    import type { Release } from "$lib/interfaces";

    export let release: Release;
</script>
<div class="flex flex-col gap-8 md:gap-0 md:grid place-items-center md:grid-cols-3 md:grid-rows-[minmax(0,_1fr)_minmax(0,_1fr)_70px] h-fit xl:px-8">
    <img src={release.image} alt="Art" class="h-48 w-48 md:h-60 md:w-60 xl:h-80 xl:w-80 m-auto border-2 border-black border-solid rounded-lg md:row-span-3" />
    <div class="md:col-span-2 md:row-span-2 px-4 text-left">
        <h2 class="text-2xl xl:text-4xl font-bold uppercase text-center md:text-left">{release.name} - {release.type}</h2>
        <div class="text-center md:text-left xl:text-lg">Released: {release.releaseDate.toLocaleDateString()}</div>
        <p class="uppercase text-md xl:text-xl mt-1 xl:mt-2 text-justify">{release.description}</p>
    </div>
    <div class="flex justify-center items-center gap-8 h-full col-span-2">
        {#each release.links as link }
            <a class="block py-2 px-4 xl:py-4 xl:px-8 rounded-full border-solid border-2 w-fit transition-colors text-lg md:text-xl xl:text-2xl capitalize hover:bg-orange" href={link.link}>{link.site}</a>
        {/each}
    </div>
</div>
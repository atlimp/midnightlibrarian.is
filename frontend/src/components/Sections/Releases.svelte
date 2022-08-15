<script lang="ts">
    import ReleaseInfo from "../ReleaseInfo.svelte";
    import Carousel from "../Carousel.svelte";
    import Section from "../Section.svelte";
    import type { Release } from '$lib/interfaces';

    export let releases: Release[]
</script>
<Section flex styles="flex-col gap-24 items-center text-center my-16 gap-32 blur-2xs m-auto lg:w-11/12">
    <h1 class="text-3xl lg:text-6xl">Releases</h1>
    <Carousel>
        {#each releases as release}
            {#if release.active}
                <ReleaseInfo release={release} />
            {/if}
        {/each}
    </Carousel>
</Section>
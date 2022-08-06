<script lang="ts">
    import ReleaseInfo from "../ReleaseInfo.svelte";
    import Carousel from "../Carousel.svelte";
    import type { Release } from '$lib/interfaces';

    export let releases: Release[]

</script>
<div class="w-full lg:w-5/6 flex flex-col gap-24 items-center text-center pt-24 pb-32 gap-32 blur-2xs m-auto">
    <h1 class="text-3xl lg:text-6xl">Releases</h1>
    <Carousel>
        {#each releases as release}
            {#if release.active}
                <ReleaseInfo release={release} />
            {/if}
        {/each}
    </Carousel>
</div>
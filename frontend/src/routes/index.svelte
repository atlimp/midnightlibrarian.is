<script context="module">
    import { fetchLinks, fetchConfig, fetchQuote, fetchReleases } from '$stores/infoStore';
    // This preloads the data before the page is rendered
    export async function load({ params, fetch }) {
        const links = await fetchLinks(fetch);
        const config = await fetchConfig(fetch);
        const quote = await fetchQuote(fetch);
        const releases = await fetchReleases(fetch);
        return { props: { links, config, quote, releases } };
    }
</script>
<script lang="ts">
    import { onMount } from "svelte";
    import Player from "../components/Sections/Player.svelte";
    import AdditionalInfo from '../components/Sections/AdditionalInfo.svelte';
    import Releases from '../components/Sections/Releases.svelte';
    import Contact from '../components/Sections/Contact.svelte';
    import Info from '../components/Sections/Info.svelte';
    
    export let links;
    export let config;
    export let quote;
    export let releases;
    export let loaded = false;

    onMount(() => {
        loaded = true;
    })
</script>
<div id="tv" class="fixed transition-all duration-500 {loaded ? 'bg-transparent opacity-80' : 'bg-black'} inset-0 h-screen w-screen z-50 pointer-events-none before:fixed before:h-screen before:w-screen before:inset-0 before:pointer-events-none before:bg-tv before:animate-flicker before:z-10 after:fixed after:inset-0 after:animate-grain after:bg-grain after:opacity-40 after:h-full-x2 after:w-full-x2 after:-left-2/4 after:-top-2/4 after:pointer-events-none"></div>
<Player links={links} config={config} quote={quote}/>
<hr class="w-5/6 opacity-20 mx-auto" />
{#if config.AdditionalInfo || true}
    <AdditionalInfo />
    <hr class="w-5/6 opacity-20 mx-auto" />
{/if}
<Info />
<hr class="w-5/6 opacity-20 mx-auto" />
<Releases releases={releases} />
<hr class="w-5/6 opacity-20 mx-auto" />
<Contact />
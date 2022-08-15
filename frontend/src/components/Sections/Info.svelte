<script lang='ts'>
    import { onMount } from 'svelte';
    import Carousel from "../Carousel.svelte";
    import Section from "../Section.svelte";
    import type { CarouselOptions, Member } from "$lib/interfaces";
    import MemberInfo from "../MemberInfo.svelte";
import { SCREEN_SIZES } from '$lib/constants';

    export let members: Member[];
    let carouselOptions: CarouselOptions = {} as CarouselOptions;

    onMount(() => {
        setCarouselOptions();
		window.addEventListener('resize', setCarouselOptions);
		
		return () => {
			window.removeEventListener('resize', setCarouselOptions);
		}
	});

    const setCarouselOptions = () => {
        let windowWidth = window.innerWidth;
        let currentParticleCount = carouselOptions.particlesToShow;
        if (windowWidth < SCREEN_SIZES.lg && currentParticleCount != 1) {
            carouselOptions.particlesToShow = 1;
        } else if (windowWidth > SCREEN_SIZES.lg && windowWidth < SCREEN_SIZES.xl && currentParticleCount != 2) {
            carouselOptions.particlesToShow = 2;
        } else if (windowWidth > SCREEN_SIZES.xl && windowWidth < SCREEN_SIZES.xxl && currentParticleCount != 3) {
            carouselOptions.particlesToShow = 3;
        } 
        else if (windowWidth > SCREEN_SIZES.xxl && currentParticleCount != 4) {
            carouselOptions.particlesToShow = 4;
        }
    }
</script>
<Section flex styles="place-items-center flex-col gap-16 my-16 m-auto lg:w-11/12">
    <div class="flex flex-col gap-16">
        <img class="w-5/6 xl:w-1/2 rounded-xl m-auto" src="GroupPortrait.jpg" alt="Concert in Hljómahöll, Keflavík. Get your tickets now!"/>
        <p class="text-lg md:text-xl xl:text-2xl text-center w-5/6 xl:w-4/6 m-auto"><strong>Midnight Librarian</strong> is an Icelandic band comprised of 8 musicians with a musical style that is somewhat difficult to place into a specific genre. Mainly we play what we think sounds cool, and we hope you do too.</p>
    </div>
    <div class="flex flex-col w-full items-center gap-16">
        <h2 class="text-2xl lg:text-4xl">Members</h2>
        <Carousel options={carouselOptions}>
            {#each members as member}
                <MemberInfo member={member} />
            {/each}
        </Carousel>
    </div>
</Section>

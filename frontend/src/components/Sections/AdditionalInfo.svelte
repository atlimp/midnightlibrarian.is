<script lang='ts'>
    import Button from "../Button.svelte";
    import Section from "../Section.svelte";
</script>
<Section styles="place-items-center" full>
    <div class="z-10 text-center font-cooper uppercase">
        <div class="text-2xl md:text-4xl lg:text-6xl py-8">Annual Concert</div>
        <div class="text-4xl md:text-6xl lg:text-8xl">Hljómahöll</div>
        <div class="text-2xl md:text-4xl lg:text-6xl">26. August</div>
        <Button text="Tickets" link="https://tix.is/is/event/13690/midnight-librarian/" rounded size="lg" styles="my-8 m-auto"/>
    </div>
    <img class="absolute inset-0 h-full w-full object-cover" src="AdditionalInfoConcert.jpg" alt="Concert in Hljómahöll, Keflavík. Get your tickets now!"/>
</Section>
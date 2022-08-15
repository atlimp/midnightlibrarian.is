<script lang="ts">
    import type { Member } from "$lib/interfaces";

    export let member: Member;
</script>
<div class="flex flex-col gap-8 place-items-center h-fit xl:px-8">
    <img src={member.image} alt="Art" class="h-48 w-48 md:h-60 md:w-60 m-auto border-2 border-black border-solid rounded-lg mx-4 xl:mx-8" />
    <div class="px-4 text-left w-full">
        <h2 class="text-2xl font-bold uppercase text-center">{member.name}</h2>
        <div class="text-center xl:text-lg">{member.role}</div>
        <p class="uppercase text-lg xl:text-xl mt-1 xl:mt-2 text-center">{member.description}</p>
    </div>
</div>

<!--Keeping this here for now if we want to use it instead-->
<!--div class="flex flex-col gap-8 md:gap-0 md:grid place-items-center md:grid-cols-[fit-content(50%)_minmax(0,_1fr)] md:grid-rows-2 h-fit xl:px-8">
    <img src={member.image} alt="Art" class="h-48 w-48 md:h-60 md:w-60 m-auto border-2 border-black border-solid rounded-lg md:row-span-2 mx-4 xl:mx-8" />
    <div class="md:row-span-2 px-4 text-left w-full">
        <h2 class="text-2xl font-bold uppercase text-center md:text-left">{member.name}</h2>
        <div class="text-center md:text-left xl:text-lg">{member.role}</div>
        <p class="uppercase text-lg xl:text-xl mt-1 xl:mt-2 text-justify">{member.description}</p>
    </div>
</div-->
<script lang="ts">
    export let text: string;
    export let link: string;
    export let styles: string = "";
    export let rounded: boolean = false;
    export let size: "sm"|"md"|"lg" = "md"

    const sizes = {
        sm: "py-1 px-2 xl:py-2 xl:px-4 text-lg md:text-xl xl:text-2xl",
        md: "py-2 px-4 xl:py-4 xl:px-8 text-lg md:text-xl xl:text-2xl",
        lg: "py-4 px-8 xl:py-8 xl:px-16 text-xl xl:text-3xl"
    }
</script>
<a class={`block ${sizes[size]} ${rounded ? "rounded-full" : ""} border-solid border-2 w-fit transition-colors hover:bg-orange ${styles}`} href={link}>{text}</a>
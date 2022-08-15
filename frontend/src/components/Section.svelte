<script lang='ts'>
    export let styles: string = "";
    export let full: boolean = false;
    export let flex: boolean = false;
</script>
<div class="{flex ? "flex" : "grid"} {styles} {full ? "h-screen" : null} w-full blur-2xs bg-black p-4 sm:p-12 relative overflow-hidden">
    <slot></slot>
</div>
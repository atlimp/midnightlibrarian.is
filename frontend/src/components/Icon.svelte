<script lang="ts">
    import { encode } from "js-base64";
    import InlineSVG from "svelte-inline-svg";
    export let name;
    export let style = "";
    export let svg = "";

    let source = svg ? `data:image/svg+xml;base64,${encode(svg)}` : `/Icons/${name}.svg`;
</script>
<InlineSVG src={source} class={style}/>

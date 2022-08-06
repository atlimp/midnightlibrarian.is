<script>
    import Tile from "../Tile.svelte";
</script>
<div class="grid place-items-center p-24 gap-24">
    <h1 class="text-2xl lg:text-4xl text-center">Get Midnight Librarian merchendise at our store!</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
        <!--Placeholders for images of stuff from the store-->
        <Tile link="/store" image="InMyLane.png" title="T-shirt" subtitle="3000 kr" />
        <Tile link="/store" image="FunkyFresh.png" title="Cap" subtitle="1500 kr" />
    </div>
</div>
<slot />
<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @font-face {
        font-family: 'VCR';
        src:    url('/Fonts/VCR_OSD_MONO_1.001.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Cooper';
        src:    url('/Fonts/Cooper_Std_Black.ttf') format('truetype')
    }
</style>
<svelte:head>
    <link rel="icon" type="image/svg" href={"Icons/Favicon.svg"} />
    <title>Midnight Librarian</title>
</svelte:head>

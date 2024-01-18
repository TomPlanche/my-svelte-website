<script lang="ts">
  // Imports
  import Header from "$lib/components/Header.svelte";
  import Cursor from "$lib/components/Cursor.svelte";
  import {style_vars} from "$lib/globals";
  import "$lib/styles/main.scss";
  import {type SvelteComponent} from "svelte";
  import {store} from "$lib/appStore";
  import Footer from "$lib/components/Footer.svelte";
  import Menu from "$lib/components/Menu.svelte";
  import SongPlaying from "$lib/components/SongPlaying.svelte";

  // Variables
  let headerHeight = style_vars.header_height;
  let padding = style_vars.main_padding;
  let bottomPadding = style_vars.songPlayer.large.height;
  // ref
  let cursor: SvelteComponent;

  $: if (cursor) {
    $store.cursor = cursor;
  }

  const padding_top = `calc(2 * ${padding} + ${headerHeight})`;

</script>

<main
        style="padding: {padding_top} {padding} {bottomPadding} {padding};"
>
    <Header/>
    <Cursor bind:this={cursor}/>

    <Menu />

    <slot/>

<!--    <Footer />-->
</main>

<style lang="scss">
  @import "$lib/styles/reset";
  @import "$lib/styles/base";
  @import "$lib/styles/variables";

  main {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    cursor: none;

    background-color: $blue;
    color: $app-bg-dark;
    transition: background-color 0.3s ease-in-out;

    :global(body.dark) & {
      color: $gh-text;
      background-color: $app-bg-dark;
    }
  }
</style>

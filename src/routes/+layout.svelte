<script lang="ts">
  // Imports
  // import {gsap} from "gsap/dist/gsap";

  import Header from "$lib/components/Header.svelte";
  import Cursor from "$lib/components/Cursor.svelte";
  import {style_vars} from "$lib/globals";
  import "$lib/styles/main.scss";
  import {type SvelteComponent} from "svelte";
  import {store} from "$lib/appStore";

  // Variables
  let headerHeight = style_vars.header_height;
  let padding = style_vars.main_padding;

  // ref
  let cursor: SvelteComponent;

  $: if (cursor) {
    $store.cursor = cursor;
  }

  export const padding_top = `calc(2 * ${padding} + ${headerHeight})`;
</script>

<main
        style="padding: 0 {padding};"
>
    <Header/>
    <Cursor bind:this={cursor}/>

    <slot/>
</main>

<style lang="scss">
  @import "$lib/styles/reset";
  @import "$lib/styles/base";
  @import "$lib/styles/variables";

  main {
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    cursor: none;

    background-color: $app-bg-light;
    color: $green-light;
    transition: background-color 0.3s ease-in-out;

    :global(body.dark) & {
      color: $gh-text;
      background-color: $app-bg-dark;
    }
  }
</style>

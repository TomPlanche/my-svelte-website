<script lang="ts">
    import "$lib/styles/main.scss";
    import {style_vars} from "$lib/globals";
    import Header from "$lib/components/Header.svelte";
    import Cursor from "$lib/components/Cursor.svelte";

    let headerHeight = style_vars.header_height;
    let padding = style_vars.main_padding;
    let padding_top = `calc(2 * ${padding} + ${headerHeight})`;
</script>

<main
    style="padding-top: {padding_top};"
>
    <Header />
    <Cursor />

    <slot />
</main>

<style lang="scss">
  @import "$lib/styles/reset";
  @import "$lib/styles/base";
  @import "$lib/styles/variables";

  main {
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: none;

    background-color: $app-bg-light;
    transition: background-color 0.3s ease-in-out;

    :global(body.dark) & {
      color: $gh-text;
      background-color: $app-bg-dark;
    }
  }
</style>

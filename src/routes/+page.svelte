<script lang="ts">
    import Cursor from "$lib/components/Cursor.svelte";
    import Header from "$lib/components/Header.svelte";

    import "$lib/styles/main.scss";
    import {style_vars} from "$lib/globals";
    import Hoverable from "$lib/components/Hoverable.svelte";

    let headerHeight = style_vars.header_height;
    let padding = style_vars.main_padding;
    let padding_top = `calc(2 * ${padding} + ${headerHeight})`;
</script>

<main
    style="
        padding-top: {padding_top};
    "
>
    <Header />
    <Cursor />

    <Hoverable />

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

    background-color: $gh-bg;

    cursor: none;
  }
</style>

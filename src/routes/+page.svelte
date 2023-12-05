<script lang="ts">
    import Cursor from "$lib/components/Cursor.svelte";
</script>

<main>
    <Cursor />


</main>

<style lang="scss">
  @import "$lib/styles/reset";
  @import "$lib/styles/base";

  main {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;

    cursor: none;
  }
</style>

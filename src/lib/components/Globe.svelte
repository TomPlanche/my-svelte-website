<script lang="ts">
  // Imports
  import Globe from 'globe.gl'
  import {onMount} from "svelte";

  // Variables
  // refs
  let globeRef = null

  // Functions

  // Lifecycle
  Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      (globeRef)
</script>

<div id="globe" bind:this={globeRef}></div>

<style lang="scss">
  #globe {
    width: 100%;
    height: 100%;

    background: hotpink;
  }
</style>

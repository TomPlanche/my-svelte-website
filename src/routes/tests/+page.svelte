<script lang="ts">
  // Imports
  import {onMount} from "svelte";
  import {store} from "$lib/appStore";
  import {Canvas} from "@threlte/core";
  import Scene from "$lib/components/three/Scene.svelte";
  import DebugInterface from "$lib/components/three/DebugInterface.svelte";

  // Variables
  /** @type {import('./$types').PageData} */
  export let data;

  $: data && console.log(data);

  // Lifecycle
  onMount(() => {
    $store.loadingAnimationIsDone = true;
  })
</script>

<!--<Marquee-->
<!--        debug-->
<!--&gt;-->
<!--    <h1>hello</h1>-->
<!--    <h1>hoho</h1>-->
<!--    <h1>haha</h1>-->
<!--</Marquee>-->

<!--<svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon" data-v-669b4a84="">-->
<!--    <path d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"-->
<!--          fill="currentColor" data-v-669b4a84=""-->
<!--    />-->
<!--</svg>-->

<!--<h1>-->
<!--    ✺-->
<!--</h1>-->

<!--<Hoverable-->
<!--        onEnterOptions={{-->
<!--            innerText: '🎧'-->
<!--        }}-->
<!--&gt;-->
<!--    <span>ALED</span>-->
<!--</Hoverable>-->

<!--<Menu/>-->

<Canvas>
  <Scene data={data}/>

<!--  <DebugInterface />-->
</Canvas>

<style lang="scss">
  @import "../../lib/styles/variables";

  svg,
  h1 {
    height: 3rem;
    width: auto;

    font-size: 3rem;
  }

  span {
    margin-top: 2rem;

    height: 3rem;
    font-size: 1.5rem;

    padding: 1rem 3rem;

    background: hotpink;
  }

</style>

<script lang="ts">
  // Imports

  import {onMount} from "svelte";

  /**
   * @param {number} percent_per_second
   */
  export let percent_per_second: number = 10;

  /**
   * @param {boolean} debug
   */
  export let debug: boolean = false;
  // Variables
  // refs
  let slider1: HTMLDivElement;
  let slider2: HTMLDivElement;

  // interval
  let interval: number;

  let offset: number = 0;
  let isHovered: boolean = false;

  // Functions
  const handleMouseEnter = () => {
    isHovered = true;
  }

  const handleMouseLeave = () => {
    isHovered = false;
  }

  const tick = () => {
    offset += isHovered ? percent_per_second / 200 : percent_per_second / 100;
    offset %= 100;

    if (slider1 && slider2) {
      slider1.style.transform = `translateX(${-offset}%)`;
      slider2.style.transform = `translateX(${100 - offset}%)`;
    }
  }

  // Lifecycle
  onMount(() => {
    interval = setInterval(() => {


      requestAnimationFrame(tick);

      return () => clearInterval(interval);
    }, 10)
  });
</script>

<div
        class="container"
        style={`
            border: ${debug ? '1px dotted red' : 'none'};
        `}

        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
>
    <div
            class="slide-track"

            style=""

            bind:this={slider1}
    >
        <slot/>
    </div>
    <div
            class="slide-track"

            bind:this={slider2}
    >
        <slot/>
    </div>
</div>


<style lang="scss">
  @import "../styles/variables";

  @mixin white-gradient {
    background: linear-gradient(to right, $app-bg-dark 0%, #0D111720 100%);
  }

  .container {
    height: 20vh;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    position: relative;

    overflow: hidden;

    &::before,
    &::after {
      @include white-gradient;

      position: absolute;
      top: 0;
      content: '';
      z-index: 2;

      height: 100%;
      width: 20%;

    }

    &::after {
      right: 0;
      transform: rotateZ(180deg);
    }

    &::before {
      left: 0;
    }

    .slide-track {
      height: 100%;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      animation: translate 100ms linear;
    }
  }
</style>

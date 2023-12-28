<script lang="ts">
  // Imports
  import Hoverable from "$lib/components/Hoverable.svelte";

  // Variables
  // props
  /**
   * Title
   *
   * @type {string}
   */
  export let title = "";

  /**
   * Link
   *
   * @type {string}
   */
  export let link = "";

  /**
   * Image source
   *
   * @type {string}
   */
  export let src = "";

  /**
   * Image alt text
   *
   * @type {string}
   */
  export let alt = `${title} Logo`;

  // Functions
</script>

<span class="{$$restProps.class}">
    {#if $$slots.default}
        <slot/>
    {:else}
        <img {src} alt={alt}>
    {/if}
    <Hoverable>
        <a href={link}>{title}</a>
    </Hoverable>
</span>

<style lang="scss">
  @import "../styles/variables";

  span {
    @include span();

    @mixin backgrounds($bg-no-hover, $bg-hover) {
      &::before {
        background-color: $bg-no-hover;
      }

      &:hover {
        &::before {
          bottom: 0;
          height: 100%;
          background-color: $bg-hover;
        }
      }
    }

    @mixin backgrounds-with-svg($svg-color, $svg-color-hover) {
      svg {
        color: $svg-color;
        transition: color .2s ease-in-out;
      }

      &:hover {
        svg {
          color: $svg-color-hover;
        }
      }
    }

    &.svelte {
      @include backgrounds(hsl(12, 94%, 62%), #ff3e00);
    }

    &.typescript {
      @include backgrounds(hsl(204, 86%, 53%), #4476c0);
    }

    &.react {
      @include backgrounds(hsl(195, 86%, 40%), #087ea4);
      @include backgrounds-with-svg(#087ea4, white);

      svg {
        transition: transform .2s ease-in-out;
      }

      &:hover {
        svg {
          transform: rotate(90deg);
        }
      }
    }

    &.laravel {
      @include backgrounds(hsl(0, 100%, 50%), #F32735);
      @include backgrounds-with-svg(#f05340, white);
    }

    &.symfony {
      @include backgrounds(#436de7, #1d4ed8);
    }

    &.python {
      @include backgrounds(#44709f, #263e59);
    }

    &.rust {
      @include backgrounds(#895432, #d14e24);
    }
  }
</style>

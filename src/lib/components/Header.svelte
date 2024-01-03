<script lang="ts">
  // Imports
  import {onMount} from "svelte";
  import {fly} from "svelte/transition";

  import {gsap} from "gsap/dist/gsap";
  import ScrambleTextPlugin from 'gsap/dist/ScrambleTextPlugin';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  import {style_vars} from "$lib/globals";
  import {store} from "$lib/appStore";
  import Hoverable from "$lib/components/Hoverable.svelte";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";

  // Variables
  // Local
  let headerHeight = style_vars.header_height;
  let padding = style_vars.main_padding;

  let moonsArray = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];
  let darkIndex = moonsArray.indexOf("🌑");
  let lightIndex = moonsArray.indexOf("🌕");

  // Refs
  // Html
  let container;
  // let title;

  let time = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })

  let buttonRef;
  let currentArrayIndex = lightIndex
  let changeThemeBtnHovered: boolean = false;
  let hasBeenHovered: boolean = false;

  let clockInterval: number;
  let changeThemeBtnInterval: number;


  // Watchers
  $: {
    hasBeenHovered && handleThemeBtnHovered(changeThemeBtnHovered);
  }


  // Functions
  const changeEmoji = () => {
    if (buttonRef) {
      currentArrayIndex = (currentArrayIndex + 1) % moonsArray.length;
      buttonRef.innerHTML = moonsArray[currentArrayIndex];
    }
  }

  const handleThemeBtnHovered = async (newVal) => {
    if (newVal) {
      changeThemeBtnInterval = setInterval(() => {
        changeEmoji();
      }, 100);
    } else {
      clearInterval(changeThemeBtnInterval);

      const targetIndex = $store.theme === "dark" ? lightIndex : darkIndex;
      const changedToTarget = moonsArray.length - Math.abs(currentArrayIndex - targetIndex);

      for (let i = 0; i < changedToTarget; i++) {
        changeEmoji();
        // sleep for 100ms
        await new Promise(r => setTimeout(r, 100));
      }
    }
  }

  // On Mount
  onMount(() => {
    // Set the clock
    clockInterval = setInterval(() => {
      time = new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }, 100);
  });


</script>


{#if $store.loadingAnimationIsDone}
  <div
    class="container"
    bind:this={container}

    style="height: {headerHeight}; top: {padding}; right: {padding};"

    in:fly={{y: '-100%', duration: 500, opacity: 0}}
  >
  <!--    <Hoverable>-->
  <!--        <a href="/" bind:this={title} class="title">Tom Planche</a>-->
  <!--    </Hoverable>-->

      <div>
        <Hoverable
            onEnterOptions={{
              opacity: 0,
              svg: "https://github.githubassets.com/images/mona-loading-dark.gif",
            }}
        >
            <img src="/logos/github-mark-white.svg" alt="Github logo">
        </Hoverable>
        <span>{ time }</span>
        <MagnetikContainer
            field_size="2"
        >
            <Hoverable>
                <button
                    class="no-style"

                    on:mouseenter={() => {hasBeenHovered = true; changeThemeBtnHovered = true}}
                    on:mouseleave={() => changeThemeBtnHovered = false}

                    on:click={() => {
                      document.body.classList.toggle($store.theme);
                      $store.toggleTheme();
                      document.body.classList.toggle($store.theme);
                    }}

                    bind:this={buttonRef}
                >
                  { moonsArray[lightIndex] }
                </button>
            </Hoverable>
        </MagnetikContainer>
      </div>
  </div>
{/if}

<style lang="scss">
.container {
  @import "../styles/variables";

  width: max-content;

  position: fixed;
  padding: 0 1rem;
  right: 5rem;
  z-index: 100;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: .5rem;

  // Blurry background
  background-color: $header-bg-dark;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); // Compatible with Safari

  transition: background-color 0.5s ease-in-out;

  color: $blue;

  :global(body.light) & {
    color: $green-dark;
    background-color: $green-light-dimmed;
  }

  .title {
      font-size: 2rem;
      font-family: "Neue Bit", serif;
      font-weight: 700;
    }

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img, button {
      height: 1.5rem;
      width: auto;
      font-size: 1.5rem;

      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      cursor: none;
    }

    span {
      font-size: 1rem;
      font-family: "Fraktion Mono", serif;
      font-weight: 700;

      padding: 0 1rem;
    }

  }
}
</style>

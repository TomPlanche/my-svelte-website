<script lang="ts">
  // Imports
  import {gsap} from "gsap/dist/gsap";
  import ScrambleTextPlugin from 'gsap/dist/ScrambleTextPlugin';
  import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  gsap.registerPlugin(ScrambleTextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  import {style_vars} from "$lib/globals";
  import {store} from "$lib/appStore";
  import {onMount} from "svelte";
  import Hoverable from "$lib/components/Hoverable.svelte";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";

  // Variables

  // VARIABLES
  // Local
  let headerHeight = style_vars.header_height;
  let padding = style_vars.main_padding;

  let moonsArray = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];
  let darkIndex = moonsArray.indexOf("🌑");
  let lightIndex = moonsArray.indexOf("🌕");

  // Refs
  // Html
  let container;
  let title;

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

  $: if (container) {
    const scrollTriggerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: window.document.body,
          start: 'top top',
          end: "+=35%",
          scrub: 1,
        }
      });

    scrollTriggerTimeline
      .to(container, {
        duration: 1,
        width: '100vw',
        top: 0,
        borderRadius: 0,
      })

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

  $: if ($store.loadingAnimationIsDone) {
    gsap.fromTo(container, {
      opacity: 0,
      y: -100,
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });
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

    gsap.timeline({repeat: -1, repeatDelay: 3})
      .to(title, {
        duration: () => Math.random() * 2 + 2,
        scrambleText: {
          text: "<TomPlanche \\>",
          chars: "@&][{}()#%?!", // speed: Math.random() * 0.5 + 0.25,
            revealDelay: Math.random() * 0.5 + 0.1,
            // ease: "power3.inOut",
          },
        })
      });
</script>


<div
    class="container"
    bind:this={container}

    style="height: {headerHeight}; padding: 0 {padding}; top: {padding};"
>
    <div>
      <h1 bind:this={title} class="title">Tom Planche</h1>
    </div>
    <div>
      <Hoverable
          onEnterOptions={{
            opacity: 0,
            svg: "https://github.githubassets.com/images/mona-loading-dark.gif",
          }}
      >
          <img src="/imgs/github-mark-white.svg" alt="Github logo">
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

<style lang="scss">
.container {
  @import "../styles/variables";

  width: 90vw;

  position: fixed;
  left: 50%;
  transform: translate(-50%);
  z-index: 100;

  opacity: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 1rem;

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

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 2rem;
      font-family: "Neue Bit", serif;
      font-weight: 700;
    }

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

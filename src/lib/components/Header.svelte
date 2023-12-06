<script lang="ts">
  // Imports
  import {gsap} from "gsap/dist/gsap";
  // import ScrollTrigger from 'gsap/dist/ScrollTrigger';
  import ScrambleTextPlugin from 'gsap/dist/ScrambleTextPlugin';
  gsap.registerPlugin(ScrambleTextPlugin);

  import {style_vars} from "$lib/globals";
  import {store} from "$lib/appStore";
  import {onMount} from "svelte";
  import Hoverable from "$lib/components/Hoverable.svelte";

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

  let clockInterval: number;
  let changeThemeBtnInterval: number;

  // Watchers


  $: {
    handleThemeBtnHovered(changeThemeBtnHovered);
  }

  // Functions
  const changeEmoji = () => {
    console.log(`currentArrayIndex: ${currentArrayIndex}`);
    currentArrayIndex = (currentArrayIndex + 1) % moonsArray.length;

    buttonRef.innerHTML = moonsArray[currentArrayIndex];
  }

  const handleThemeBtnHovered = async (newVal) => {
    if (newVal) {
      changeThemeBtnInterval = setInterval(() => {
        changeEmoji();
      }, 100);
    } else {
      clearInterval(changeThemeBtnInterval);

      const targetIndex = $store.getTheme() === "dark" ? lightIndex : darkIndex;
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
        }, 1000);


        gsap.timeline({repeat: -1, repeatDelay: 3})
          .to(title, {
            duration: () => Math.random() * 2 + 2,
            scrambleText: {
              text: "<TomPlanche \\>",
              chars: "@&][{}()#%?!",
              // speed: Math.random() * 0.5 + 0.25,
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
      <button
          class="no-style"

          on:mouseenter={() => changeThemeBtnHovered = true}
          on:mouseleave={() => changeThemeBtnHovered = false}

          on:click={() => $store.toggleTheme()}

          bind:this={buttonRef}
      >
        { moonsArray[darkIndex] }
      </button>
    </div>
</div>

<style lang="scss">
.container {
  width: 90vw;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 1rem;

  // Blurry background
  background-color: #eeeeee25;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px); // Compatible with Safari

  div {
    @import "../styles/variables";

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 2rem;
      font-family: "Neue Bit", serif;
      font-weight: 700;

      color: $blue;
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

      color: $blue;

      padding: 0 1rem;
    }

  }
}
</style>

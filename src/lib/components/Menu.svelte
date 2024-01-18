<script lang="ts">
  // Imports
  import {gsap} from "gsap/dist/gsap";
  import {style_vars} from "$lib/globals";
  import {fly} from "svelte/transition";
  import Hoverable from "$lib/components/Hoverable.svelte";
  import {store} from "$lib/appStore";
  import {onMount} from "svelte";

  // Variables
  // types
  export type T_Link = {
    name: string;
    url: string;
    isCurrent?: boolean;
  }

  // props
  /**
   * All links tu put in the menu.
   *
   * @type T_Link[]
   */
  export const links: T_Link[] = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Projects",
      url: "/projects",
    },
  ];

  const percentageBetweenTwoLinks = 10;

  // refs
  let menuItems: Array<HTMLElement> = [];
  let ul: HTMLElement;

  const {main_padding, header_height} = style_vars;

  // Functions
  const handleMouseEnter = () => {
    console.log("Mouse enter");

    const tl = gsap.timeline();

    tl
      .to('.a-to-animate', {
        translateX: 0,
        backgroundColor:`rgba(255,255,255, ${.1 * links.length})`,
        ease: "back.inOut",

      }, '<')
      .to(ul, {
          gap: '1rem',
      }, '<')
  }

  const handleMouseLeave = () => {
    const tl = gsap.timeline();

    tl
      .to(ul, {
        gap: '0',
      })

    menuItems.forEach((item, i) => {
      tl
        .to(item, {
          translateX: `-${(100 - percentageBetweenTwoLinks) * i}%`,
          backgroundColor: `rgba(255,255,255, ${.25 - i * .05})`,
          ease: "back.inOut"
        }, '<')
    });
  }

  // Lifecycle
  onMount(() => {
      // find current link
      links.forEach(link => {
          if (link.url === window.location.pathname) {
              link.isCurrent = true;
          }
      });
  })

</script>

{#if $store.loadingAnimationIsDone}
    <nav
            style="
                top: {main_padding};
                left: {main_padding};
                padding: 0 {main_padding};
            "

            on:mouseenter={handleMouseEnter}
            on:mouseleave={handleMouseLeave}


            in:fly={{y: '-100%', duration: 500, opacity: 0}}
    >
        <ul bind:this={ul}>
            {#each links as link, i}
            <li
                style="
                    z-index: {9000 + (links.length - i) * 100 + (link.isCurrent ? 1000 : 0)};
                "

            >
                <Hoverable>
                    <a
                        href={link.url}

                        style="
                            background-color: {`rgba(255,255,255, ${.25 - i * .05})`};
                            height: {header_height};
                            transform: {i > 0 ? `translateX(-${90 * i}%)` : ''};
                        "
                        class="a-to-animate"
                        bind:this={menuItems[i]}

                    >
                        {link.name}
                    </a>
                </Hoverable>
            </li>
            {/each}
        </ul>
    </nav>
{/if}

<style lang="scss">
  nav {
    position: fixed;

    ul {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      isolation: isolate;

      a {
        width: 6rem;
        padding: .25rem 3.5rem;

        border-radius: .5rem;
        font-size: 1.25rem;

          // Blurry background
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px); // Compatible with Safari

        display: flex;
        justify-content: center;
        align-items: center;

      }
    }

  }
</style>

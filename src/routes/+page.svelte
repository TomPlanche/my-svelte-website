<script lang="ts">
  // Imports
  import {onMount} from "svelte";

  import {gsap} from "gsap/dist/gsap";
  import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
  import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin";

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  import {store} from "$lib/appStore";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";
  import SongPlaying from "$lib/components/SongPlaying.svelte";
  import Hoverable from "$lib/components/Hoverable.svelte";

  // Variables
  // references
  let content: HTMLElement;
  let image: HTMLElement;

  let scrollTriggerTrigger: HTMLElement;
  let titleContainer: HTMLElement;
  let dummy: HTMLElement;

  let startAnimation;

  // Watchers
  $: if (scrollTriggerTrigger) {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTriggerTrigger,
        // when the top of the trigger hits the middle of the viewport
        start: "top 50%",
        // when the bottom of the trigger hits the top of the viewport
        end: "50% 50%",
        scrub: true,
      }
    });

    scrollTl
      .fromTo(scrollTriggerTrigger, {
        paddingTop: 0,
      }, {
        ease: "power4.out",
        paddingTop: $store.paddingTopEnd,
      })
      .fromTo(titleContainer, {
        transform: "translateY(-100%)",
        fontSize: "4rem",
      }, {
        fontSize: "3rem",
        transform: "translateY(0)",
        ease: "power4.out",
      }, "<")
      .fromTo(dummy, {
        flex: 0,
      }, {
        flex: 1,
        ease: "circ.out",
      }, "<")
  }

  // Methods
  const scrollTo = (element: HTMLElement) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    gsap.to(window, {
      duration: 1.5,
      scrollTo: top,
      ease: "circ.out"
    })
  }

  // Lifecycle
  onMount(() => {
    $store.loadingAnimationIsDone = false;

    startAnimation = gsap.timeline({
      defaults: {
        duration: .75,
      }
    });

    startAnimation
      .set(content, {
        display: "none",
      })
      .fromTo(image, {
        opacity: 0,
        scale: .25
      }, {
        opacity: 1,
        scale: 1,
        delay: .5,
      })
      .fromTo(content, {
        width: 0,
        display: "flex"
      }, {
        width: "50%",
        duration: .5,
        ease: "power4.out",
      })
      .fromTo(content, {
        opacity: 0,
      }, {
        opacity: 1,
        onComplete: () => {
          $store.loadingAnimationIsDone = true;
        },
      })
  })

</script>

<section
        class="intro"
>
    <div
            class="content"

            bind:this={content}
    >
        <h1>Tom Planche</h1>
        <h2>
            Full Stack Developer<br/>
            Programmer
        </h2>
    </div>
    <div
            class="image"

            bind:this={image}
    >
        <MagnetikContainer
                field_size="1.5"
                field_force=".25"
                block={!$store.loadingAnimationIsDone}
        >
            <div class="img-container">
                <img
                        src="/imgs/imageCV.png"
                        alt="My Ugly Face"
                />
            </div>
        </MagnetikContainer>
    </div>
</section>

{#if $store.loadingAnimationIsDone}
    <section
            bind:this={scrollTriggerTrigger}
    >
        <Hoverable>
            <div
                    class="title-container"

                    bind:this={titleContainer}
                    on:click={() => scrollTo(scrollTriggerTrigger)}
            >
                <h1 class="section-title">WHOAMI</h1>
                <div class="dummy" bind:this={dummy}></div>
            </div>
        </Hoverable>
    </section>

    <SongPlaying/>
{/if}

<style lang="scss">
  @import "../lib/styles/variables";

  :global(body.light) {
    .title-container,
    .intro {
      color: $green-dark
    }

    .img-container {
      img {
        // make a filter to transform the blue from the image to green
        filter: invert(20%);
      }
    }

  }

  section {
    min-height: 100vh;
    width: 100%;

    .title-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 4rem;


      .section-title {
        font-weight: 900;
        text-align: center;

        font-family: "PP Mondwest", serif;

        display: inline-flex;

        &:before {
          content: ">_";
          margin-right: 1rem;
        }
      }

      .dummy {
        width: 0;
        transition: width .2s ease-in-out;
      }
    }

    &.intro {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      @media (max-width: 860px) {
        flex-direction: column-reverse;

        .content {
          padding: 0;
        }
      }

      .content,
      .image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        width: 50%;
        height: 100%;

        @media (max-width: 860px) {
          width: 100%;
          align-items: center;

          &.image {
            justify-content: flex-end;
          }

          &.content {
            justify-content: flex-start;
            padding-top: 5vh;
          }
        }
      }

      .content {
        padding-left: 5rem;

        @media (max-width: 860px) {
          padding: 0;
        }

        h1, h2 {
          text-align: left;
          font-family: "PP Mondwest", serif;

          @media (max-width: 860px) {
            text-align: center;
          }
        }

        h1 {
          font-size: 7vw;
          font-weight: 900;
        }

        h2 {
          font-size: 4vw;
          font-weight: 400;

        }

      }

      .image {
        display: flex;
        justify-content: center;
        align-items: center;

        .img-container {
          height: 45vmin;
          width: auto;
          border-radius: 4rem;

          overflow: hidden;

          img {
            height: 100%;
            width: auto;
            border-radius: 4rem;

            transition: transform .2s ease-in-out;


            &:hover {
              transform: scale(1.1);
            }
          }
        }
      }

    }
  }
</style>

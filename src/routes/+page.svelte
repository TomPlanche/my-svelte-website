<script lang="ts">
  // Imports
  import {onMount} from "svelte";
  import {fade} from 'svelte/transition';

  import {gsap} from "gsap/dist/gsap";
  import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
  import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin";

  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  import {store} from "$lib/appStore";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";
  import SongPlaying from "$lib/components/SongPlaying.svelte";
  import Hoverable from "$lib/components/Hoverable.svelte";
  import {style_vars} from "$lib/globals";

  // Variables
  let padding = style_vars.main_padding;

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
      },
      defaults: {
        ease: "sine.inOut"
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
        transform: `translateY(calc(-100% - ${padding})`,
        fontSize: "5rem",
      }, {
        fontSize: "8rem",
        transform: "translateY(0)",
      }, "<")
      .fromTo(dummy, {
        flex: 0,
      }, {
        flex: 1,
      }, "<")
  }

  // Methods
  const scrollTo = (element: HTMLElement) => {
    const top = element.getBoundingClientRect().top + window.scrollY;

    gsap.to(window, {
      duration: 1.5,
      scrollTo: top,
      ease: "sine.inOut"
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
            class="about-me"

            bind:this={scrollTriggerTrigger}
    >
        <Hoverable>
            <div
                    class="title-container"

                    bind:this={titleContainer}
                    on:click={() => scrollTo(scrollTriggerTrigger)}

                    in:fade
                    out:fade
            >
                <h1 class="section-title">ABOUT</h1>
                <div class="dummy" bind:this={dummy}></div>
            </div>
        </Hoverable>

        <p>
            I'm Tom Planche, a 21 years old 🇫🇷 developer.<br/>
            I first built this website using
            <span class="react">
                <Hoverable>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-11 -10.13 22 20.27">
                        <circle r="2" fill="currentColor"/>
                        <g stroke="currentColor">
                            <ellipse rx="10" ry="4.5"/>
                            <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                            <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
                        </g>
                    </svg>
                    <a href="https://react.dev/">React</a>
                </Hoverable>
            </span> but in order to learn, I rebuilt (and improved it) in
            <span class="svelte">
                <Hoverable>
                    <img src="/logos/svelte-logo.svg" alt="Svelte Logo">
                    <a href="https://svelte.dev/">Svelte</a>
                </Hoverable>
            </span>
            , both with
            <span class="typescript">
                <Hoverable>
                    <img src="/logos/ts-logo-512.png" alt="TypeScript Logo">
                    <a href="https://www.typescriptlang.org/">TypeScript</a>
                </Hoverable>
            </span>.
        </p>
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

        font-family: "PP NeueBit", serif;

        display: inline-flex;

        text-transform: uppercase;

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

    &.about-me {
      p {
        font-size: 3rem;
        font-weight: 400;
        line-height: 1.15;
        text-align: left;
        //font-family: "Radikal", serif;
        //font-family: "Fraktion Mono", serif;
        font-family: "Charlevoix", serif;

        padding: 5rem 0;

        @media (max-width: 860px) {
          padding: 2rem 2rem;
        }

        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: max-content;

          position: relative;
          isolation: isolate;

          padding: .15rem;

          img, svg {
            height: 2.5rem;
            width: auto;

            margin-right: .5rem;
          }

          &::before {
            content: "";
            position: absolute;
            bottom: 10%;
            left: 0;

            height: 20%;
            width: 100%;

            border-radius: 4px;

            z-index: -1;

            transition: height .2s ease-in-out, background-color .2s ease-in-out, bottom .1s ease-in-out;
          }

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

          &.svelte {
            @include backgrounds(hsl(12, 94%, 62%), #ff3e00);
          }

          &.typescript {
            @include backgrounds(hsl(204, 86%, 53%), #4476c0);
          }

          &.react {
            @include backgrounds(hsl(195, 86%, 40%), #087ea4);

            svg {
              color: #087ea4;
              transition: color .2s ease-in-out;
            }

            &:hover {
              svg {
                color: white;
              }
            }
          }
        }
      }
    }
  }
</style>

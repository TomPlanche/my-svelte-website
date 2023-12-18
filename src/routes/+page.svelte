<script lang="ts">
  // Imports
  import {gsap} from "gsap/dist/gsap";
  import {ScrollTrigger} from "gsap/dist/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  import {store} from "$lib/appStore";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";
  import SongPlaying from "$lib/components/SongPlaying.svelte";
  import {style_vars} from "$lib/globals";

  // Variables
  // from store
  const pagePadding = style_vars.main_padding;

  // References
  let scrollTrigger: HTMLElement;
  let titleContainer: HTMLElement;
  let dummy: HTMLElement;

  // Watchers
  $: if (scrollTrigger) {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollTrigger,
        // when the top of the trigger hits the middle of the viewport
        start: "top 50%",
        // when the bottom of the trigger hits the top of the viewport
        end: "50% 50%",
        scrub: true,
      }
    });

    scrollTl
      .fromTo(scrollTrigger, {
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

</script>

<section
        class="intro"
>
    <div
            class="content"
    >
        <h1>Tom Planche</h1>
        <h2>
            Full Stack Developer <br/>
            Programmer
        </h2>
    </div>
    <div
            class="image"
    >
        <MagnetikContainer
                field_size="1.5"
                field_force=".25"
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

<section bind:this={scrollTrigger}>
    <div class="title-container" bind:this={titleContainer}>
        <h1 class="section-title">WHOAMI</h1>
        <div class="dummy" bind:this={dummy}></div>
    </div>
</section>

<SongPlaying/>

<style lang="scss">
  @keyframes blink {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

  section {
    min-height: 100vh;
    width: 100vw;

    .title-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      font-size: 4rem;

      transform: translateY(-100%);

      .section-title {
        font-weight: 900;
        text-align: center;

        font-family: "PP Mondwest", serif;

        display: inline-flex;

        &:before {
          content: ">";
          margin-right: 1rem;
        }

        &:after {
          content: "_";
          margin-left: .25rem;

          font-family: "Hyperwave", serif;
          animation: blink 1s infinite;
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

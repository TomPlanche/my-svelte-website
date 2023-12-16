<script lang="ts">
  import SongPlaying from "$lib/components/SongPlaying.svelte";
  import {store} from "$lib/appStore";
  import {style_vars} from "$lib/globals";
  import MagnetikContainer from "$lib/components/magnetik/MagnetikContainer.svelte";

  const pageMinHeight = $store.pageMinHeight;
  const pagePadding = style_vars.main_padding;
</script>

<div
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
</div>

<SongPlaying/>

<style lang="scss">
  .intro {
    height: 100vh;
    width: 100vw;

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

      h1 {
        font-size: 7vw;
        font-weight: 900;

        font-family: "PP Mondwest", serif;
      }

      h2 {
        font-size: 4vw;
        font-weight: 400;

      }

      h1, h2 {
        text-align: left;
        font-family: "PP Mondwest", serif;

        @media (max-width: 860px) {
          text-align: center;
        }
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
</style>

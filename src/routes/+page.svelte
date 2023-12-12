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
    style="min-height: {pageMinHeight}"
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
             <img
                src="/imgs/imageCV.png"
                alt="My Ugly Face"
            />
        </MagnetikContainer>
    </div>
</div>

<SongPlaying/>

<style lang="scss">
  .intro {
    width: 100vw;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 860px) {
      flex-direction: column-reverse;

      gap: 5rem;

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
        }
    }

    .content {
        padding-left: 5rem;

        @media (max-width: 860px) {
          padding: 0;
        }

        h1 {
            font-size: 5rem;
            font-weight: 900;

            font-family: "PP Mondwest", serif;
        }

        h2 {
            font-size: 2rem;
            font-weight: 400;
            font-family: "PP Mondwest", serif;

        }

        h1, h2 {
          text-align: left;

            @media (max-width: 860px) {
                text-align: center;
            }
        }
    }

    .image {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
          height: 45vmin;
          width: auto;
        border-radius: 4rem;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

  }
</style>

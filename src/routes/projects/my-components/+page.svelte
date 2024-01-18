<script lang="ts">
  // Imports
  import {onMount, type SvelteComponent} from "svelte";
  import {store} from "$lib/appStore";
  import MyCustomCursor from "./MyCustomCursor.svelte";
  import CurrentlyPlayingMusic from "./CurrentlyPlayingMusic.svelte";

  // Variables
  type T_Component = {
    name: string,
    description: string,
    link: string,
    selfPresentation: SvelteComponent
  }
  // Functions
  const components: T_Component[] = [
    {
      aName: "Cursor",
      link: "#myCursor",
      selfPresentation: 'myCustomCursor'
    },
    {
      aName: "Currently Playing Music",
      link: "#currentlyPlayingMusic",
      selfPresentation: 'currentlyPlayingMusic'
    },
  ]

  // Lifecycle

  onMount(() => {
    $store.loadingAnimationIsDone = true;
  })
</script>

<section>
  <h1>My components:</h1>
  <ul>
    {#each components as component}
      <li>
        <a href="{component.link}">{component.aName}</a>
      </li>
    {/each}
  </ul>

  {#each components as component}
    <section id="{component.link}">
      <h2>{component.aName}</h2>
      {
        @html component.description
      }

      {#if component.selfPresentation === 'myCustomCursor'}
        <MyCustomCursor/>
      {:else if component.selfPresentation === 'currentlyPlayingMusic'}
        <CurrentlyPlayingMusic/>
      {/if}
    </section>
  {/each}
</section>

<style lang="scss">
  section {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    h1 {
      font-family: Cirka, sans-serif;
      // clamp the font size with a max of 10rem
      font-size: clamp(2rem, 10vw, 10rem);

      align-self: flex-start;
    }

    ul {
      width: 100%;
      padding: 3rem 0;

      li {
        width: 100%;
        font-family: Cirka, sans-serif;
        // clamp the font size with a max of 10rem
        font-size: clamp(1rem, 4vw, 4rem);


        transition: transform 0.2s ease-in-out;

        &:hover {
          transform: translateX(1rem);
        }

        a {
          width: 100%;

          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;


          text-decoration: none;
          color: var(--color-text);
          transition: color 0.2s ease-in-out;

          &::before {
            content: ">";
            margin-right: 1rem;
          }

          &:hover {
            color: var(--color-accent);
          }
        }
      }
    }

    section {
      width: 100%;
      padding: 3rem 0;

      h2 {
        font-family: Cirka, sans-serif;
        // clamp the font size with a max of 10rem
        font-size: clamp(1rem, 4vw, 4rem);
      }
    }
  }

  :global(.description) {
    width: 100%;
    // clamp the font size with a max of 10rem
    font-size: clamp(1rem, 2vw, 2rem);

    line-height: 1.5;
    text-align: left;
  }

  :global(.code) {
    font-family: Terminal Grotesk, monospace;
    background-color: #23272d;

    padding: 4px 2px;
    border-radius: 8px;
  }
</style>

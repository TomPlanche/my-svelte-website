<script lang="ts">
  // Imports
	import { createEventDispatcher } from 'svelte';
  import { fly, fade} from "svelte/transition";
  import {store} from "$lib/appStore";

  // Variables
	const dispatch = createEventDispatcher();

  export let ALL_CHOICES: string[] = $store.projectTags;
  let possibleChoices = ALL_CHOICES;
  let possibleChoicesColors = $store.projectColors;

  let choices: string[] = [];

  // ExtProps

  // Functions
  const handleInput = (e: InputEvent) => {
    // filter the input type
    if (!(e instanceof InputEvent)) {
      // get the choice
      const choice = (e.target as HTMLInputElement).value;

      // check if the choice is valid and not already in the list
      if (possibleChoices.includes(choice) && !choices.includes(choice)) {
        // add the choice to the list
        choices = [...choices, choice];

        // remove the choice from the possible choices
        possibleChoices = possibleChoices.filter(c => c !== choice);

        // dispatch the event
        dispatch('choicesUpdated', { choices });

        // clear the input
        (e.target as HTMLInputElement).value = "";
      }
    }
  }

  const handleDelete = (choice: string) => {
    console.log(`[handleDelete] ${choice}`);
    // remove the choice from the list
    choices = choices.filter(c => c !== choice);

    // add the choice to the possible choices
    possibleChoices = [...possibleChoices, choice];

    // dispatch the event
    dispatch('choicesUpdated', { choices });
  }

  // Watchers
  // sort the choices alphabetically
  $: choices = choices.sort((a, b) => a.localeCompare(b));
  $: possibleChoices = possibleChoices.sort((a, b) => a.localeCompare(b));

</script>

<div
        class="input-container"
        style="{choices.length > 0 ? 'gap: 1rem;' : ''}"
>
    <div class="choices">
        {#each choices as choice}
            <div
                    class="choice"

                    style="background: {possibleChoicesColors[choice]}"

                    out:fly={{ y: -10, duration: 200 }}
                    in:fade={{ duration: 100 }}

            >
                <span>{choice}</span>
                <svg
                        on:click={() => handleDelete(choice)}

                        width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7427 8.46448L19.1569 9.87869L17.0356 12L19.157 14.1214L17.7428 15.5356L15.6214 13.4142L13.5 15.5355L12.0858 14.1213L14.2072 12L12.0859 9.87878L13.5002 8.46457L15.6214 10.5858L17.7427 8.46448Z"
                          fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M8.58579 19L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L8.58579 5H22.5857V19H8.58579ZM9.41421 7L4.41421 12L9.41421 17H20.5857V7H9.41421Z"
                          fill="currentColor"/>
                </svg>
            </div>
        {/each}
    </div>
    {#if possibleChoices.length > 0}
        <input
                type="text"
                list="search-list"
                placeholder="Search"


                style="{choices.length === 0 ? 'width: 100%;' : ''}"

                on:input={handleInput}
        >
    {/if}
</div>

<datalist id="search-list">
    {#each possibleChoices as choice}
        <option value={choice}/>
    {/each}
</datalist>


<style lang="scss">
  @import "../styles/variables";

  .input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 3rem;
    width: max-content;

    padding: .25rem .5rem;
      margin: .25rem .5rem;
    border-radius: .75rem;

    outline: 1px solid $outline-dark;

    :global(body.light) & {
      outline: 1px solid $outline-light;
    }

    .choices {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: .5rem;

      .choice {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        height: 100%;
        width: 100%;
        padding: .25rem .5rem;

        border-radius: .25rem;

        span {
          margin-right: 5px;
        }

        svg {
          height: auto;
          width: 1rem;
        }
      }
    }

    input {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      outline: 1px solid $outline-dark;
      text-align: left;

      width: 100%;
      border-radius: .25rem;

      padding: .25rem .5rem;

      :global(body.light) & {
        outline: 1px solid $outline-light;
      }

    }
  }
</style>

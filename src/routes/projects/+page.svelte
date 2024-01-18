<script lang="ts">
	// Imports
	import { onMount } from 'svelte';
  import {store} from '$lib/appStore';
	import MultiChoiceSelector from '$lib/components/MultiChoiceSelector.svelte';
	import Menu from '$lib/components/Menu.svelte';
  import {style_vars} from "$lib/globals";
  import Project from "$lib/components/Project.svelte";
  import type {T_Project} from "$lib/types";

	// Variables
	/** @type {T_ProjectData)} */
	export let data;

	let selectedChoices: string[] = [];
	const {padding_top} = style_vars;

  let projects: T_Project[] = [];

	// Functions
	const handleChoicesUpdated = (event: CustomEvent<{ choices: string[] }>) => {
		selectedChoices = event.detail.choices;
	};

  const filterWithChoices = () => {
    if (selectedChoices.length === 0) return data.repositories;

    return data.repositories.filter((project) => {
      // filter by category
      if (selectedChoices.includes(project.category)) return true;
    });
  };

	// Watchers
	$: selectedChoices && (projects = filterWithChoices());


	// Lifecycle

	onMount(() => {
		$store.loadingAnimationIsDone = true;
	});
</script>

<h1>Projects</h1>
<section style="min-height: calc(100vh - {padding_top});">
  <div class="filter">
    <span>Filters: </span>
	  <MultiChoiceSelector on:choicesUpdated={handleChoicesUpdated} />
  </div>

  <div class="projects" style="margin-bottom: {padding_top};">
    {#if projects}
      {#each projects as project}
        <Project {...project} />
      {/each}
    {:else}
      <p>No projects found</p>
    {/if}
  </div>
</section>

<Menu />

<style lang="scss">
  h1 {
    font-family: Cirka, sans-serif;
    font-size: 10rem;

    align-self: flex-start;
  }

  section {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .filter {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;


      margin: 2rem 0;

    }

    .projects {
      height: 100%;
      width: 100%;

      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      grid-gap: 1rem;


      @for $i from 0 through 5 {
        @media screen and (max-width: 1536px - (300 * $i)) {
          & {
            grid-template-columns: repeat(5 - ($i + 1), minmax(0, 1fr));
          }
        }
      }
    }
  }
</style>

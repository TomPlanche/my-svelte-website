<script lang="ts">
	// Imports
	import { onMount } from 'svelte';
	import { store, type T_Tag } from '$lib/appStore';
	import MultiChoiceSelector from '$lib/components/MultiChoiceSelector.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { style_vars } from '$lib/globals';
	import Project from '$lib/components/Project.svelte';
	import type { T_Repository } from '../api/repositories/+server';
	import type { T_Project } from '$lib/types';

	// Variables
	/** @type {import('./$types').PageData} */
	export let data;

	let selectedChoices: string[] = [];
	const { padding_top } = style_vars;

	let projects: T_Project[] = data.repositories;

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
	<MultiChoiceSelector on:choicesUpdated={handleChoicesUpdated} />

	<div class="projects">
		{#each projects as project}
			<Project {...project} />
		{/each}
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

		.projects {
			height: 100%;
			width: 100%;

			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			grid-auto-rows: 1fr;
			grid-gap: 1rem;

			@for $i from 0 through 4 {
				@media screen and (max-width: 1280px - (256 * $i)) {
					& {
						grid-template-columns: repeat(4 - ($i + 1), minmax(0, 1fr));
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	// Imports
	import {
		store
	} from '$lib/appStore';
	import type { T_Tag } from '$lib/appStore';

	// Variables
	// props
	export let title: string = 'Title';
	export let category: string = 'Component';
	export let link: string = '#';
	export let tags: T_Tag[] = [];
	export let tagsColors: Record<T_Tag, string> = $store.projectColors;
	export let paragraph: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';

	// Functions
	const openLink = () => {
		window.open(link, '_blank');
	}
</script>

<div class="container" on:click={openLink}>
	<span class="category">Projects - {category}</span>

	<div>
		<div class="tags">
			{#each tags as tag}
				<span
					style="
						background: {tagsColors[tag]};
					"
				>{tag}</span>
			{/each}
		</div>
		<h3>{title}</h3>
		<p>{paragraph}</p>
	</div>
</div>

<style lang="scss">
	.container {
		// Blurry background
		background: #eeeeee10;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px); // Compatible with Safari

		border-radius: 0.5rem;
		padding: 1rem;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);

		aspect-ratio: 1/1;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;

		.category {
			font-size: 1.25rem;
			font-weight: 600;
			text-align: left;
		}

		.tags {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: .5rem;

			span {
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;

				font-size: 1.25rem;
			}
		}

		h3 {
			font-family: Cirka, sans-serif;
			font-size: 2.5rem;
			text-align: left;


			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;

			margin: 1rem 0;
		}

		p {
			font-size: 1.25rem;
			text-align: left;

			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}
</style>

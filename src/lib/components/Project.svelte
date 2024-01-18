<script lang="ts">
	// Imports
	import {
		store, TAGS
	} from '$lib/appStore';
	import type { T_Tag } from '$lib/appStore';
	import {onMount} from "svelte";

	// Variables
	// props

	/**
	 * Projects title
	 *
	 * @type {string}
	 */
	export let title: string = 'Title';

	/**
	 * Projects category
	 *
	 * @type {string}
	 */
	export let category: string = 'Component';

	/**
	 * Projects link
	 *
	 * @type {string}
	 */
	export let link: string;

	/**
	 * Projects tags
	 *
	 * @type {T_Tag[]}
	 */
	export let tags: T_Tag[] = [];

	/**
	 * Projects tags colors
	 *
	 * @type {Record<T_Tag, string>}
	 */
	export let tagsColors: Record<T_Tag, string> = $store.projectColors;

	/**
	 * Projects paragraph
	 *
	 * @type {string}
	 */
	export let paragraph: string = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.';

	/**
	 * Projects image
	 *
	 * @type {string}
	 */
	export let image: string = null;

	let svg: string = null;

	// Functions
	const openLink = () => {
		window.open(link, '_blank');
	}

	onMount(() => {
		if (!image) {

			if (title.toLowerCase().includes("components")) {
				svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.7572 6.3431L11.9998 2.10046L16.2425 6.3431L11.9998 10.5857L7.7572 6.3431ZM10.5856 6.3431L11.9998 4.92889L13.4141 6.3431L11.9998 7.75732L10.5856 6.3431Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2.10046 11.9999L6.3431 7.75726L10.5857 11.9999L6.3431 16.2425L2.10046 11.9999ZM4.92889 11.9999L6.3431 10.5857L7.75732 11.9999L6.3431 13.4141L4.92889 11.9999Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M13.4142 11.9999L17.6568 16.2425L21.8995 11.9999L17.6568 7.75726L13.4142 11.9999ZM17.6568 10.5857L16.2426 11.9999L17.6568 13.4141L19.071 11.9999L17.6568 10.5857Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M7.7572 17.6569L11.9998 13.4142L16.2425 17.6569L11.9998 21.8995L7.7572 17.6569ZM10.5856 17.6569L11.9998 16.2427L13.4141 17.6569L11.9998 19.0711L10.5856 17.6569Z" fill="currentColor" /></svg>';
			} else if (title.includes("commit")) {
				svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" /></svg>';
			} else if (tags.includes(TAGS.Svelte)) {
				image = '/imgs/svelte-kit-machine.png';
			} else if (title.includes('cli')) {
				svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.0333 14.8284L6.44751 16.2426L10.6902 12L6.44751 7.75733L5.0333 9.17155L7.86172 12L5.0333 14.8284Z" fill="currentColor" /><path d="M15 14H11V16H15V14Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M2 2C0.895431 2 0 2.89543 0 4V20C0 21.1046 0.89543 22 2 22H22C23.1046 22 24 21.1046 24 20V4C24 2.89543 23.1046 2 22 2H2ZM22 4H2L2 20H22V4Z" fill="currentColor" /></svg>';
			} else if (title.includes('blender')) {
				svg = '<svg fill="currentColor" height="800px" width="800px" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 611.999 611.999" xml:space="preserve"><g><path d="M34.864,436.154c0,25.238,20.532,45.77,45.77,45.77c8.835,0,17.089-2.523,24.092-6.878l155.56,89.848c-0.013,0.445-0.034,0.888-0.034,1.336c0,25.237,20.532,45.77,45.77,45.77s45.77-20.532,45.77-45.77c0-0.477-0.021-0.948-0.036-1.421l155.526-89.758c7.001,4.351,15.252,6.872,24.084,6.872c25.238,0,45.771-20.533,45.771-45.77c0-17.416-9.78-32.588-24.134-40.321l0.031-179.603c14.338-7.738,24.104-22.902,24.104-40.305c0-0.013-0.001-0.025-0.001-0.038s0.001-0.025,0.001-0.038c0-25.237-20.533-45.77-45.771-45.77c-8.844,0-17.105,2.529-24.113,6.891L351.774,47.166c0.004-0.243,0.019-1.284,0.019-1.396c0-25.238-20.533-45.77-45.77-45.77s-45.77,20.532-45.77,45.77c0,0.112,0.014,1.142,0.018,1.381l-155.573,89.784c-6.996-4.343-15.24-6.859-24.063-6.859c-25.238,0-45.77,20.532-45.77,45.77c0,0.013,0.001,0.025,0.001,0.038s-0.001,0.025-0.001,0.038c0,17.398,9.759,32.558,24.09,40.298l-0.03,179.649C44.609,403.616,34.864,418.768,34.864,436.154z M507.282,214.821c0.787,0.489,1.586,0.959,2.403,1.4l-0.031,179.649c-14.314,7.746-24.059,22.897-24.059,40.283c0,0.451,0.021,0.898,0.034,1.346l-155.586,89.793c-0.768-0.476-1.55-0.933-2.347-1.364V346.302c14.334-7.74,24.096-22.901,24.096-40.302c0-0.477-0.021-0.948-0.036-1.421L507.282,214.821z M281.412,84.997c7.113,4.555,15.555,7.21,24.61,7.21c9.05,0,17.487-2.651,24.597-7.202l155.01,89.53c-0.012,0.437-0.033,0.871-0.033,1.311c0,0.013,0.001,0.025,0.001,0.038c0,0.013-0.001,0.025-0.001,0.038c0,0.451,0.021,0.898,0.034,1.346l-155.586,89.794c-6.988-4.327-15.216-6.832-24.021-6.832c-8.835,0-17.089,2.523-24.092,6.878l-155.56-89.847c0.013-0.445,0.034-0.888,0.034-1.336c0-0.013-0.001-0.025-0.001-0.038s0.001-0.025,0.001-0.038c0-0.459-0.021-0.914-0.035-1.371L281.412,84.997z M102.301,216.229c0.825-0.445,1.632-0.919,2.425-1.412l155.56,89.848c-0.013,0.445-0.034,0.888-0.034,1.336c0,17.401,9.762,32.562,24.097,40.302v179.626c-0.823,0.444-1.627,0.917-2.419,1.41l-155.56-89.848c0.013-0.445,0.034-0.888,0.034-1.336c0-17.416-9.78-32.588-24.134-40.321L102.301,216.229z"/> </g></svg>';
			} else if (title.toLowerCase().includes('api')) {
				image = '/logos/last-fm.png';
				console.log('ALED');
			}


		}
	})
</script>

<div class="container {(image || svg) ? 'hover-effect' : ''}" on:click={openLink}>
	<span class="category resist-hover">Projects - {category}</span>

	<svg class="open-link resist-hover" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 13.9633H16V7.96331H10V9.96331H12.5858L7.25623 15.2929L8.67044 16.7071L14 11.3775V13.9633Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M23 19C23 21.2091 21.2091 23 19 23H5C2.79086 23 1 21.2091 1 19V5C1 2.79086 2.79086 1 5 1H19C21.2091 1 23 2.79086 23 5V19ZM19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21Z" fill="currentColor" /></svg>

	<div>
		<div class="tags">
			{#each tags as tag}
				<span
					style="
						background: {tagsColors[tag]};
						box-shadow:
							inset 0 0 0 1px rgba(0,0,0,.1),
							inset 0 -2px 0 1px rgba(0,0,0,.1);
					"
				>{tag}</span>
			{/each}
		</div>

		<h3>{title}</h3>
		<p>{paragraph}</p>
	</div>

	{#if image}
		<img src={image} alt={title} />
	{/if}

	{#if svg}
		{@html svg}
	{/if}
</div>

<style lang="scss">
	@import '../styles/variables.scss';
	.container {
		// Blurry background
		background: linear-gradient(0deg, #eeeeee10 0%, $blue 100%);
		:global(body.dark) & {
			background: linear-gradient(0deg, #eeeeee20 40%, $app-bg-dark 100%);
    }

		outline: #eeeeee20 solid 2px;

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

		position: relative;
		isolation: isolate;
		overflow: hidden;


		&:hover {
			.open-link {
				opacity: 1;
			  top: 1rem;
			  right: 1rem;
			}

			&.hover-effect {
				*:not(.resist-hover, .open-link, img) {
					opacity: .5;
				}

				img, :global(svg:not(.open-link)) {
					opacity: 1;
					z-index: 1;

					width: calc(75% - 2rem);
				}
			}


		}

		.open-link {
			position: absolute;
			top: -1rem;
			right: -1rem;

			height: 2rem;
			width: 2rem;

			cursor: pointer;

			opacity: 0;
			transition: all 0.2s ease-in-out;
		}

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

			position: relative;
			z-index: 2;
		}

		p {
			font-size: 1.25rem;
			text-align: left;

			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}

		img, :global(svg:not(.open-link)) {
			position: absolute;

			width: calc(65% - 2rem);
			height: auto;

			object-fit: cover;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			z-index: -1;

			opacity: .25;

			transition: all 0.2s ease-in-out;
		}

		:global(svg:not(.open-link)) {
			height: calc(60% - 2rem);
		}
	}
</style>

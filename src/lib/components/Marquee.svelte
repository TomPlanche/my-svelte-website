<script lang="ts">
	// Imports

	import { onMount } from 'svelte';

	/**
	 * Number of percent to move per second (default: 10).
	 *
	 * @type {number}
	 */
	export let percent_per_second: number = 10;

	/**
	 * If true, the component will show a red border and debug information (default: false).
	 *
	 * @type {boolean}
	 */
	export let debug: boolean = false;

	/**
	 * The class to apply to the container (default: '').
	 *
	 * @type {string}
	 */
	export let marqueeClass: string = '';

	// Variables
	// refs
	let slider1: HTMLDivElement;
	let slider2: HTMLDivElement;

	// interval
	let interval: NodeJS.Timeout;

	let offset: number = 0;
	let isHovered: boolean = false;

	// Functions
	const handleMouseEnter = () => {
		isHovered = true;
	};

	const handleMouseLeave = () => {
		isHovered = false;
	};

	const tick = () => {
		offset += isHovered ? percent_per_second / 200 : percent_per_second / 100;
		offset %= 100;

		if (slider1 && slider2) {
			slider1.style.transform = `translateX(${-offset}%)`;
			slider2.style.transform = `translateX(${100 - offset}%)`;
		}
	};

	// Lifecycle
	onMount(() => {
		interval = setInterval(() => {
			requestAnimationFrame(tick);

			return () => clearInterval(interval);
		}, 10);
	});
</script>

<!-- A11y: Avoid <marquee> elements -->
<div
	style={`
            border: ${debug ? '1px dotted red' : 'none'};
        `}
	class="container {marqueeClass}"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	aria-hidden="true"
>
	<div class="slide-track" style="" bind:this={slider1}>
		<slot />
	</div>
	<div class="slide-track" bind:this={slider2}>
		<slot />
	</div>
</div>

<style lang="scss">
	@import '../styles/variables';

	@mixin dark-gradient {
		background: linear-gradient(to right, $app-bg-dark 0%, #080a1320 50%);
	}

	@mixin white-gradient {
		background: linear-gradient(to right, $app-bg-light 0%, #e5e9ea20 50%);
	}

	.container {
		height: 20vh;
		width: 100%;

		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;

		position: relative;

		overflow: hidden;

		&::before,
		&::after {
			:global(body.dark) & {
				@include dark-gradient;
			}

			:global(body.light) & {
				@include white-gradient;
			}

			position: absolute;
			top: 0;
			content: '';
			z-index: 2;

			pointer-events: none;

			height: 100%;
			width: 50%;

			transition: all 300ms linear;
		}

		&::after {
			right: 0;
			transform: rotateZ(180deg);
		}

		&::before {
			left: 0;
		}

		.slide-track {
			height: 100%;
			width: 100%;

			position: absolute;
			top: 0;
			left: 0;

			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;

			animation: translate 100ms linear;
		}
	}
</style>

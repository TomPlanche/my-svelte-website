<script lang="ts">
	// Imports
    import {spring} from "svelte/motion";
	import {cursorStore} from "../appStore";
	import type {T_CursorOptions} from "../types";

	// Variables
	const cursor_base = {size: 15};

	const opacity = spring(0);
	const coords = spring({
		x: 0,
		y: 0,
	}, {stiffness: 0.3, damping: 0.8});
    const size = spring(cursor_base.size);

	let hasMoved = false as boolean;

	let innerSvg: string;


	let innerHtml: HTMLElement;

	let innerHtmlSize = {width: 0, height: 0};

	// Functions
	cursorStore.subscribe((params: T_CursorOptions) => {
		if (params.isHover) {
			// params.svg can be undefined, a svg string or a boolean
			if (params.svg) {
				opacity.set(params.opacity ?? 0);
				innerSvg = params.svg;
			}

			opacity.set(params.opacity ?? 0.5);
		} else {

			if (params.svg === false || params.svg === undefined) {
				innerSvg = undefined;
				opacity.set(params.opacity ?? 1);
			} else {
				opacity.set(params.opacity ?? 1);
			}
		}

		size.set(params.scale ? cursor_base.size * params.scale : cursor_base.size);
	});

	// if hasMoved is false, then the cursor is not visible
	$: if (!hasMoved) {
		opacity.set(0);
	} else {
		setTimeout(() => {
			opacity.set(1);
		}, 150);
	}

	$: if (innerHtml) {
		innerHtmlSize = {
			width: innerHtml.offsetWidth,
			height: innerHtml.offsetHeight
		};
	}
</script>


<svelte:window
	on:mousemove={(e) => {
		!hasMoved && (hasMoved = true);

		coords.set({
			x: e.clientX,
			y: e.clientY,
		})
	}}
	on:mousedown={() => {
		size.update((s) => s * 1.5);
	}}
	on:mouseup={() => {
		size.update((s) => s / 1.5);
	}}
/>

<svg
	aria-hidden="true"
>
	<circle
		cx={$coords.x}
		cy={$coords.y}
		r={$size}
		style="opacity: {$opacity};"
	/>
</svg>

{#if innerSvg}
	<img
		src={innerSvg}
		alt="Github gif"
		style="
			height: {$size * 2}px;
			width: {$size * 2}px;
			transform: translate({$coords.x - $size}px, {$coords.y - $size}px);
		"
	/>
{/if}

{#if ($$slots.default)}
	<div
		class="html-container"
		style="transform: translate({$coords.x}px, {$coords.y}px); opacity: {$opacity};"

		bind:this={innerHtml}
	>
		<slot />
	</div>
{/if}



<style lang="scss">
	svg {
		position: fixed;
		top: 0;
		left: 0;

		pointer-events: none;

		width: 100%;
		height: 100%;

		z-index: 99999;

		circle {
			fill: #eeeeee90;
		}
	}

	img {
		position: absolute;
		top: 0;
		left: 0;

		pointer-events: none;
	}

	.html-container {
		position: absolute;
		top: 0;
		left: 0;

		z-index: 99999;

		pointer-events: none;
	}
</style>

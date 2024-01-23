<script lang="ts">
	// Imports
	import { gsap } from 'gsap/dist/gsap';
	import { SplitText } from 'gsap/dist/SplitText';

	gsap.registerPlugin(SplitText);

	// Variables
	// props
	import { onMount } from 'svelte';

	export let title: string = 'Hello World';

	// refs
	let span: HTMLSpanElement;
	let splitText: SplitText;

	// types
	type Side = 'top' | 'right' | 'bottom' | 'left';

	// gsap timeline
	const tl = gsap.timeline({
		defaults: {
			duration: 0.3,
			ease: 'power2.inOut'
		}
	});

	// Functions
	/**
	 * Detects where the mouse enters the element, either:
	 * - top
	 * - right
	 * - bottom
	 * - left
	 *
	 * @param e {MouseEvent} The mouse event.
	 */
	const detectEnterSide = (e: MouseEvent) => {
		const { clientX, clientY } = e;
		const { width, height } = e.target!.getBoundingClientRect();

		const x = clientX - e.target!.offsetLeft;
		const y = clientY - e.target!.offsetTop;

		const xRatio = x / width;
		const yRatio = y / height;

		const isEnter = e.type === 'mouseenter';

		if (xRatio > yRatio) {
			if (xRatio > 1 - yRatio) {
				console.log(`right - ${e.type}`);

				tl.to(
					splitText.chars,
					{
						x: isEnter ? 10 : 0,
						y: isEnter ? 0 : 0,
						stagger: 0.05
					},
					0
				).to(
					splitText.chars,
					{
						x: isEnter ? 0 : 0,
						y: isEnter ? 0 : 0,
						stagger: 0.05
					},
					0.3
				);

				return;
			}
			console.log('top');
			return;
		}

		if (xRatio > 1 - yRatio) {
			console.log('bottom');
			return;
		}

		console.log('left');
	};

	// Watchers
	$: if (span) {
		splitText = new SplitText(span, { type: 'chars' });
		splitText.chars.forEach((char, i) => {
			char.style.overflow = 'hidden';
		});
	}
</script>

<div
	class="container"
	on:mouseenter={detectEnterSide}
	on:mouseleave={detectEnterSide}
	aria-hidden="true"
>
	<span bind:this={span}>{title}</span>
</div>

<style lang="scss">
	.container {
		width: max-content;
		height: 3rem;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		padding: 1rem;

		span {
			font-size: 3rem;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.5rem;
		}
	}
</style>

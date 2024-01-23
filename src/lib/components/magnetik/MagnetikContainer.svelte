<script lang="ts">
	// Imports
	import { gsap } from 'gsap';

	// Types
	type T_recenteredTrue = {
		verticalUp: boolean;
		horizontalLeft: boolean;
	};

	// Props
	/*
   This component can receive props
       - field_size: number
       - field_force: number
       - centered: boolean
       - recentered: boolean
       - block: boolean
       - debug: boolean
   */
	export let field_size = 2;
	export let field_force = 0.5;
	export let centered = true;
	export let recentered: T_recenteredTrue | false = false;
	export let block = false;
	export let debug = false;

	// Normal variables
	let container_ref;
	let passed_slot_ref;
	let debug_infos_ref;

	// Watchers
	$: if (debug) {
		if (debug_infos_ref) {
			let { top, left, width, height } = container_ref.getBoundingClientRect();

			left = left + width / 2;
			left -= (width / 2) * field_size;

			top = top + height / 2;
			top -= (height / 2) * field_size;

			gsap.set(debug_infos_ref, {
				top,
				left,
				width: width * field_size,
				height: height * field_size
			});
		}
	}

	// Methods
	const handleMagnetikContainerMouseMove = (e: MouseEvent) => {
		if (!passed_slot_ref || block) return;

		const { clientX, clientY } = e;
		const mainContainerRect = container_ref.getBoundingClientRect();
		// @ts-ignore
		// (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
		const passedRect = passed_slot_ref.getBoundingClientRect();

		const mainContainerInfos = {
			top: mainContainerRect.top,
			left: mainContainerRect.left,
			width: mainContainerRect.width,
			height: mainContainerRect.height
		};

		const passedInfos = {
			top: passedRect.top,
			left: passedRect.left,
			width: passedRect.width,
			height: passedRect.height
		};

		const centerX = mainContainerInfos.left + mainContainerInfos.width / 2;
		const centerY = mainContainerInfos.top + mainContainerInfos.height / 2;

		const sideRatioX =
			Math.floor(((clientX - centerX) / (mainContainerInfos.width / 2)) * 100) / 100;
		const sideRatioY =
			Math.floor(((clientY - centerY) / (mainContainerInfos.height / 2)) * 100) / 100;

		const translateX = centered
			? (mainContainerInfos.width / 2) * sideRatioX * field_force
			: ((passedInfos.width - mainContainerInfos.width) / -2) * sideRatioX * field_force;

		const translateY = centered
			? (mainContainerInfos.height / 2) * sideRatioY * field_force
			: ((passedInfos.height - mainContainerInfos.height) / -2) * sideRatioY * field_force;

		// @ts-ignore
		// (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
		gsap.to(passed_slot_ref, {
			duration: 0.3,
			x: translateX,
			y: translateY,
			ease: 'power2.out'
		});
	};

	const handleMagnetikContainerMouseLeave = () => {
		if (!container_ref || block) return;

		// @ts-ignore
		// (TS2339: Property 'current' does not exist on type '((instance: HTMLElement | null) => void) | MutableRefObject<HTMLElement | null>'.
		gsap.to(passed_slot_ref, {
			duration: 0.3,
			x: 0,
			y: 0,
			ease: 'power2.out'
		});
	};
</script>

<div
	class="container{debug ? ' debug' : ''}"
	bind:this={container_ref}
	on:mousemove={handleMagnetikContainerMouseMove}
	on:mouseleave={handleMagnetikContainerMouseLeave}
>
	<div class="slot-container" bind:this={passed_slot_ref}>
		<slot />
	</div>
</div>

{#if debug}
	<div class="debug-infos" bind:this={debug_infos_ref}></div>
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.debug-infos {
		position: absolute;
		top: 0;
		left: 0;

		border: 2px dotted red;

		pointer-events: none;
	}
</style>

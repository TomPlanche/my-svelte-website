<script lang="ts">
	import { onMount } from 'svelte';

	let time = new Date();

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	const divider = 8;
	const ticks = Array.from({ length: divider }, (_, i) => (60 / divider) * i);

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svg viewBox="-50 -50 100 100">
	<circle class="clock-face" r="48" />
	<rect class="rect-aled" x="-50" y="-50" width="100" height="100" rx="25" />

	<!-- markers -->
	{#each ticks as minute}
		<line
			class="major"
			y1={minute % 15 === 0 ? 38 : 50}
			y2={minute % 15 === 0 ? 45 : 45}
			transform="rotate({30 * minute})"
		/>
	{/each}

	<!-- hour hand -->
	<rect
		class="hour"
		x="-.5"
		y="-20"
		width="1"
		height="20"
		rx=".5"
		transform="rotate({30 * hours + minutes / 2})"
	/>

	<!-- minute hand -->
	<rect
		class="hour"
		x="-.5"
		y="-20"
		width="1"
		height="20"
		rx=".5"
		transform="rotate({6 * minutes + seconds / 60})"
	/>
</svg>

<style lang="scss">
	svg {
		width: 100%;
		height: 100%;
	}

	.rect-aled {
		fill: white;
	}

	.clock-face {
		stroke: #333;
		fill: white;
	}

	.major {
		stroke: #333;
		stroke-width: 1;
	}

	.hour {
		stroke: #333;
	}
</style>

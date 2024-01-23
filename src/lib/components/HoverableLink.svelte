<script lang="ts">
	// Imports
	import Hoverable from '$lib/components/Hoverable.svelte';

	// Variables
	// props
	/**
	 * Title
	 *
	 * @type {string}
	 */
	export let title = '';

	/**
	 * Link
	 *
	 * @type {string}
	 */
	export let link = '';

	/**
	 * Image source
	 *
	 * @type {string}
	 */
	export let src = '';

	/**
	 * Image alt text
	 *
	 * @type {string}
	 */
	export let alt = `${title} Logo`;

	// Functions
</script>

<span class={$$restProps.class}>
	{#if $$slots.default}
		<slot />
	{:else}
		<img {src} {alt} />
	{/if}
	<Hoverable>
		<a href={link}>{title}</a>
	</Hoverable>
</span>

<style lang="scss">
	@import '../styles/variables';

	span {
		@include span();

		&.svelte {
			@include backgrounds(hsl(12, 94%, 62%), #ff3e00);
		}

		&.typescript {
			@include backgrounds(hsl(204, 86%, 53%), #4476c0);
		}

		&.react {
			@include backgrounds(hsl(195, 86%, 40%), #087ea4);
			@include backgrounds-with-svg(#087ea4, white);
		}

		&.laravel {
			@include backgrounds(hsl(0, 100%, 50%), #f32735);
			@include backgrounds-with-svg(#f05340, white);
		}

		&.symfony {
			@include backgrounds(#436de7, #1d4ed8);
		}

		&.python {
			@include backgrounds(#44709f, #263e59);
		}

		&.rust {
			@include backgrounds(#895432, #d14e24);
		}
	}
</style>

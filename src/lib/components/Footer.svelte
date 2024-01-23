<script lang="ts">
	// Imports
	import { style_vars } from '$lib/globals';
	import { onMount } from 'svelte';
	import { store } from '$lib/appStore';

	// Variables
	const { songPlayer } = style_vars;

	// Functions
</script>

{#if $store.loadingAnimationIsDone}
	<footer style="height: {songPlayer.large.height};">
		<p>
			Made with <img src="/imgs/pixel-heart.gif" alt="Heart GIF" /> by me :)
		</p>
	</footer>
{/if}

<style lang="scss">
	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		width: 100%;

		p {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			font-size: 1.5rem;
			font-weight: 500;

			img {
				width: 2rem;
				height: auto;

				margin: 0 0.5rem;
			}
		}
	}
</style>

<script lang="ts">
	// Imports
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	import { gsap } from 'gsap/dist/gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

	gsap.registerPlugin(ScrollTrigger);
	gsap.registerPlugin(ScrollToPlugin);

	import { store } from '$lib/appStore';
	import MagnetikContainer from '$lib/components/magnetik/MagnetikContainer.svelte';
	import SongPlaying from '$lib/components/SongPlaying.svelte';
	import Hoverable from '$lib/components/Hoverable.svelte';
	import { style_vars } from '$lib/globals';
	import HoverableLink from '$lib/components/HoverableLink.svelte';
	import Menu from '$lib/components/Menu.svelte';

	// Variables
	const { padding_top } = style_vars;
	const pageMinHeight = $store.pageMinHeight;

	// references
	let content: HTMLElement;
	let image: HTMLElement;

	let scrollTriggerTrigger: HTMLElement;
	let title: HTMLElement;

	let startAnimation;

	// Watchers
	$: if (scrollTriggerTrigger) {
		const scrollTl = gsap.timeline({
			scrollTrigger: {
				trigger: scrollTriggerTrigger,
				// when the top of the trigger hits the middle of the viewport
				start: 'top 50%',
				// when the bottom of the trigger hits the top of the viewport
				end: '20% 50%',
				scrub: true
			},
			defaults: {
				ease: 'sine.inOut'
			}
		});

		scrollTl.fromTo(
			title,
			{
				fontSize: '5rem'
			},
			{
				fontSize: '8rem',
				translateY: 0
			},
			'<'
		);
	}

	// Methods
	const scrollTo = (element: HTMLElement) => {
		const top = element.getBoundingClientRect().top + window.scrollY;

		gsap.to(window, {
			duration: 1.5,
			scrollTo: top,
			ease: 'sine.inOut'
		});
	};

	// Lifecycle
	onMount(() => {
		$store.loadingAnimationIsDone = false;

		startAnimation = gsap.timeline({
			defaults: {
				duration: 0.75
			}
		});

		startAnimation
			.set(content, {
				display: 'none'
			})
			.fromTo(
				image,
				{
					opacity: 0,
					scale: 0.25
				},
				{
					opacity: 1,
					scale: 1,
					delay: 0.5
				}
			)
			.fromTo(
				content,
				{
					width: 0,
					display: 'flex'
				},
				{
					width: '50%',
					duration: 0.5,
					ease: 'power4.out'
				}
			)
			.fromTo(
				content,
				{
					opacity: 0
				},
				{
					opacity: 1,
					onComplete: () => {
						$store.loadingAnimationIsDone = true;
					}
				}
			);
	});
</script>

<section
	class="intro"
	style="min-height: calc(100vh - {padding_top}); padding-bottom: {padding_top}"
>
	<div bind:this={content} class="content">
		<h1>Tom Planche</h1>
		<h2>
			Full Stack Developer<br />
			Pr0gramm3r
		</h2>
	</div>
	<div bind:this={image} class="image">
		<MagnetikContainer block={!$store.loadingAnimationIsDone} field_force=".25" field_size="1.5">
			<div class="img-container">
				<img alt="My Ugly Face" src="/imgs/imageCV.png" />
			</div>
		</MagnetikContainer>
	</div>
</section>

{#if $store.loadingAnimationIsDone}
	<section
		class="about-me"
		bind:this={scrollTriggerTrigger}
		style="max-height: {pageMinHeight}; padding-bottom: {padding_top}"
	>
		<Hoverable>
			<button
				class="section-title"
				bind:this={title}
				in:fade
				out:fade
				on:click={() => scrollTo(scrollTriggerTrigger)}>ABOUT</button
			>
		</Hoverable>

		<p>
			I'm Tom Planche, a 🇫🇷 developer 👨🏼‍💻. Currently studying in <span class="bayonne"
				>Bayonne <span>🏄‍♂️</span></span
			>.
			<br />
			<br />
			This website was built using
			<HoverableLink
				title="React"
				link="https://reactjs.org/"
				src="/logos/react-logo.svg"
				class="react"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-11 -10.13 22 20.27">
					<circle r="2" fill="currentColor" />
					<g stroke="currentColor">
						<ellipse rx="10" ry="4.5" />
						<ellipse rx="10" ry="4.5" transform="rotate(60)" />
						<ellipse rx="10" ry="4.5" transform="rotate(120)" />
					</g>
				</svg>
			</HoverableLink>
			but in order to learn, I rebuilt (and improved) it in
			<HoverableLink
				title="Svelte"
				link="https://svelte.dev/"
				src="/logos/svelte-logo.svg"
				alt="Svelte Logo"
				class="svelte"
			/><!-- prettier-ignore -->, both with
      <HoverableLink
				title="TypeScript"
				link="https://www.typescriptlang.org/"
				src="/logos/ts-logo-512.png"
				alt="TypeScript Logo"
				class="typescript"
			/><!-- prettier-ignore -->.
      <br />
			<br />
			I also worked with PHP frameworks such as
			<HoverableLink title="Laravel" link="https://laravel.com/" alt="Laravel Logo" class="laravel">
				<svg
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					viewBox="0 0 444 453"
					style="enable-background:new 0 0 444 453;"
					xml:space="preserve"
				>
					<path
						d="M357.38,149.42c-0.03-0.13-0.11-0.24-0.15-0.37c-0.09-0.23-0.16-0.47-0.28-0.68c-0.08-0.14-0.2-0.26-0.3-0.39
                        c-0.13-0.17-0.24-0.36-0.39-0.51c-0.13-0.13-0.29-0.22-0.43-0.33c-0.16-0.13-0.3-0.27-0.48-0.37c0,0,0,0,0,0c0,0,0,0,0,0
                        l-52.45-30.2c-1.35-0.78-3.01-0.78-4.36,0l-52.45,30.2c0,0,0,0,0,0c0,0,0,0,0,0c-0.18,0.1-0.32,0.25-0.48,0.37
                        c-0.14,0.11-0.3,0.2-0.43,0.33c-0.15,0.15-0.26,0.34-0.39,0.51c-0.1,0.13-0.22,0.25-0.3,0.39c-0.12,0.21-0.2,0.45-0.28,0.68
                        c-0.05,0.12-0.12,0.24-0.15,0.37c-0.1,0.37-0.15,0.75-0.15,1.14v57.36l-43.71,25.17V120.87c0-0.39-0.05-0.77-0.15-1.14
                        c-0.03-0.13-0.11-0.24-0.15-0.37c-0.09-0.23-0.16-0.47-0.28-0.68c-0.08-0.14-0.2-0.26-0.3-0.39c-0.13-0.17-0.24-0.36-0.39-0.51
                        c-0.13-0.13-0.29-0.22-0.43-0.33c-0.16-0.13-0.3-0.27-0.48-0.37c0,0,0,0,0,0c0,0,0,0,0,0l-52.45-30.2c-1.35-0.78-3.01-0.78-4.36,0
                        l-52.45,30.2c0,0,0,0,0,0c0,0,0,0,0,0c-0.18,0.1-0.32,0.25-0.48,0.37c-0.14,0.11-0.3,0.2-0.43,0.33c-0.15,0.15-0.26,0.34-0.39,0.51
                        c-0.1,0.13-0.22,0.25-0.3,0.39c-0.12,0.21-0.2,0.45-0.28,0.68c-0.05,0.12-0.12,0.24-0.15,0.37c-0.1,0.37-0.15,0.75-0.15,1.14v179.66
                        c0,1.56,0.84,3.01,2.19,3.79l104.91,60.4c0.23,0.13,0.48,0.21,0.72,0.3c0.11,0.04,0.22,0.11,0.34,0.14c0.37,0.1,0.74,0.15,1.12,0.15
                        s0.75-0.05,1.12-0.15c0.1-0.03,0.19-0.09,0.29-0.12c0.26-0.09,0.52-0.18,0.76-0.31l104.91-60.4c1.36-0.78,2.19-2.22,2.19-3.79
                        v-57.36l50.26-28.94c1.36-0.78,2.19-2.22,2.19-3.79v-59.89C357.53,150.17,357.47,149.79,357.38,149.42z M195.78,295.5l-43.63-24.69
                        l45.82-26.38c0,0,0,0,0,0l50.27-28.94l43.67,25.14l-32.04,18.29L195.78,295.5z M296.33,183.29v49.8l-18.36-10.57l-25.36-14.6v-49.8
                        l18.36,10.57L296.33,183.29z M300.7,125.4l43.69,25.16l-43.69,25.16l-43.69-25.16L300.7,125.4z M166.07,252.72l-18.36,10.57V153.6
                        l25.36-14.6l18.36-10.57v109.68L166.07,252.72z M143.34,95.72l43.69,25.16l-43.69,25.16l-43.69-25.16L143.34,95.72z M95.25,128.43
                        L113.61,139l25.36,14.6v117.24c0,0,0,0.01,0,0.01s0,0.01,0,0.01c0,0.17,0.05,0.33,0.07,0.49c0.03,0.21,0.03,0.43,0.09,0.64
                        c0,0,0,0.01,0,0.01c0.05,0.17,0.14,0.33,0.21,0.49c0.08,0.18,0.13,0.38,0.23,0.55c0,0,0,0.01,0.01,0.01
                        c0.09,0.15,0.22,0.28,0.33,0.42c0.12,0.16,0.22,0.32,0.36,0.46c0,0,0.01,0.01,0.01,0.01c0.12,0.12,0.28,0.21,0.42,0.32
                        c0.16,0.12,0.3,0.26,0.47,0.36c0.01,0,0.01,0,0.02,0.01c0.01,0,0.01,0.01,0.02,0.01l50.24,28.43v50.29L95.25,298V128.43z
                         M296.33,298l-96.17,55.37v-50.3l71.22-40.66l24.95-14.24V298z M348.78,207.92l-43.71,25.17v-49.8l25.36-14.6l18.36-10.57V207.92z"
						fill="currentColor"
					/>
				</svg>
			</HoverableLink>
			at school and
			<HoverableLink
				title="Symfony"
				link="https://symfony.com/"
				src="/logos/symfony_white.png"
				alt="Symfony Logo"
				class="symfony"
			/>
			at my internship.
			<br />
			<br />
			I also have some experience with
			<HoverableLink
				title="Python"
				link="https://www.python.org/"
				src="/logos/python-logo.png"
				alt="Python Logo"
				class="python"
			/>
			and
			<HoverableLink
				title="Rust"
				link="https://www.rust-lang.org/"
				src="/logos/rust-logo-128x128.png"
				alt="Rust Logo"
				class="rust"
			/><!-- prettier-ignore -->.





		</p>
	</section>

	<Menu />

	<SongPlaying />
{/if}

<style lang="scss">
	@import '../lib/styles/variables';

	:global(body.light) {
		.title-container,
		.intro {
			color: $app-bg-dark;
		}
	}

	section {
		width: 100%;

		&.intro {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			@media (max-width: 860px) {
				flex-direction: column-reverse;

				.content {
					padding: 0;
				}
			}

			.content,
			.image {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: flex-start;

				width: 50%;
				height: 100%;

				@media (max-width: 860px) {
					width: 100%;
					align-items: center;

					&.image {
						justify-content: flex-end;
					}

					&.content {
						justify-content: flex-start;
						padding-top: 5vh;
					}
				}
			}

			.content {
				padding-left: 5rem;

				@media (max-width: 860px) {
					padding: 0;
				}

				h1,
				h2 {
					text-align: left;
					font-family: 'PP Mondwest', serif;

					@media (max-width: 860px) {
						text-align: center;
					}
				}

				h1 {
					font-size: 7vw;
					font-weight: 900;
				}

				h2 {
					font-size: 4vw;
					font-weight: 400;
				}
			}

			.image {
				display: flex;
				justify-content: center;
				align-items: center;

				.img-container {
					height: 45vmin;
					width: auto;
					border-radius: 4rem;

					overflow: hidden;

					img {
						height: 100%;
						width: auto;
						border-radius: 4rem;

						transition: transform 0.2s ease-in-out;

						&:hover {
							transform: scale(1.1);
						}
					}
				}
			}
		}

		&.about-me {
			display: contents;

			.section-title {
				font-weight: 900;
				text-align: center;

				font-family: 'PP NeueBit', serif;

				display: inline-flex;

				text-transform: uppercase;

				transform: translateY(-100%);

				&:before {
					content: '>_';
					margin-right: 1rem;
				}
			}

			p {
				font-size: 2.75rem;
				font-weight: 400;
				line-height: 1.25;
				text-align: justify;
				//font-family: "Radikal", serif;
				//font-family: "Fraktion Mono", serif;
				font-family: 'Reckless', serif;

				align-items: center;

				padding: 4rem 0;

				@media (max-width: 860px) {
					padding: 2rem 2rem;
				}

				span {
					@include span();

					&.bayonne {
						@include backgrounds(#007227, #ba1420);
						position: relative;

						span {
							position: absolute;
							top: 50%;
							right: -25%;

							transform: translateY(-50%);
							opacity: 0;

							transition: opacity 0.2s ease-in-out;
						}

						&:hover {
							transition: width 0.2s ease-in-out;

							span {
								opacity: 1;
							}

							&::before {
								width: 125%;
							}
						}
					}

					&.react {
						@include backgrounds(hsl(195, 86%, 40%), #087ea4);
						@include backgrounds-with-svg(#087ea4, white);

						:global(body.light) & {
							@include backgrounds(#087ea4, hsl(195, 86%, 40%));
							@include backgrounds-with-svg($app-bg-dark, white);

							svg {
								transition: transform 0.2s ease-in-out;
							}

							&:hover {
								svg {
									transform: rotate(90deg);
								}
							}
						}

						svg {
							transition: all 0.2s ease-in-out;
						}

						&:hover {
							svg {
								transform: rotate(90deg);
							}
						}
					}

					&.laravel {
						svg {
							height: 3rem;
						}
					}
				}
			}
		}
	}
</style>

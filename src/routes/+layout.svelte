<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css"
		integrity="sha384-wcIxkf4k558AjM3Yz3BBFQUbk/zgIYC2R0QpeeYb+TwlBVMrlgLqwRjRtGZiK7ww"
		crossorigin="anonymous"
	/>
</svelte:head>

<ModeWatcher />
<main class="grid grid-flow-row gap-4 px-4 py-8">
	<slot />
</main>

<style lang="postcss">
	:global(body) {
		background: radial-gradient(ellipse, rgba(16, 24, 65, 1) 0%, rgba(15, 15, 22, 1) 100%);
		@apply bg-[rgb(16,24,65)] text-white min-h-screen;
	}
</style>

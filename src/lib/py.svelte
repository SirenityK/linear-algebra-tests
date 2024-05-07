<script lang="ts">
	import { K_OPTIONS } from '$lib';
	import Katex from '$lib/katex.svelte';
	import type { WorkerItem } from '$lib/webworker';
	import { type Remote } from 'comlink';

	export let query: string = '';
	export let instance: Remote<WorkerItem>;
	export let func: string = '';
	export let code: string = '';
	export let options = K_OPTIONS;

	let toRun;
	let dots = '';

	if (code) {
		toRun = async () => instance.runCustom(code);
	} else {
		toRun = async () => instance.run(query, func);
	}

	if (import.meta.env.PROD)
		setInterval(() => {
			if (dots.length === 3) dots = '';
			else dots += '.';
		}, 500);
</script>

{#if import.meta.env.PROD}
	{#await toRun()}
		<p>Cargando motor de cálculo{dots}</p>
	{:then val}
		<Katex latex={val} {options} />
	{:catch err}
		<p>Introduce algo o modifica tu entrada</p>
	{/await}
{:else}
	<p>Cannot load Pyodide on dev server</p>
{/if}

<style lang="postcss">
	p {
		@apply text-center;
	}
</style>

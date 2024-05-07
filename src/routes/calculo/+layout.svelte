<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Katex from '$lib/katex.svelte';
	import Py from '$lib/py.svelte';
	import { input, instance, pyFunction } from '$lib/stores';
	import type { WorkerItem } from '$lib/webworker';
	import Python from '$lib/webworker?worker';
	import AsciiMathParser from 'asciimath2tex';
	import { wrap, type Remote } from 'comlink';
	import { onMount } from 'svelte';

	let ready = false;
	let pyInstance: Remote<WorkerItem> | undefined;
	let query = $input;
	const parser = new AsciiMathParser();

	$: input.set(query);
	$: latex = parser.parse(query);
	$: pyInstance = $instance;
	$: pyInput = $input;
	$: it = $pyFunction;

	onMount(async () => {
		if (import.meta.env.PROD) {
			if (typeof pyInstance === 'undefined') instance.set(wrap<WorkerItem>(new Python()));
		}
		ready = true;
	});
</script>

<slot />
<div class="flex justify-center">
	<Input
		class="max-w-4xl"
		type="text"
		autocapitalize="off"
		placeholder="Escribe una matriz"
		bind:value={query}
	/>
</div>

<Katex {latex} />

{#if ready && typeof pyInstance !== 'undefined'}
	{#key pyInput}
		<Py instance={pyInstance} code={`${it}(${pyInput})`} />
	{/key}
{/if}

<script lang="ts">
	import Katex from '$lib/katex.svelte';
	import { pyFunction } from '$lib/stores';

	pyFunction.set('find_scalars');
	const example = [
		[1, 3, 5],
		[6, 2, 9]
	];
</script>

<h1 class="text-3xl text-center">Combinación lineal</h1>
<p>
	Sintaxis de escritura:
	<Katex latex={'v_0,v_1'} options={{ displayMode: false }} />
	Donde <Katex latex={'v_0'} options={{ displayMode: false }} /> y <Katex
		latex={'v_1'}
		options={{ displayMode: false }}
	/> son vectores.
</p>
<p>Ejemplo:</p>
<p>{JSON.stringify(example)}, {JSON.stringify([20, 12, 37])}</p>

<style lang="postcss">
	p {
		@apply text-center;
	}
</style>

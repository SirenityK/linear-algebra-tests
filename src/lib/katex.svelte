<script lang="ts">
	import katex from 'katex';
	import { K_OPTIONS } from '$lib';

	export let latex: string;
	export let options = K_OPTIONS;

	let isKatex = true;

	if (latex.includes('\\doNotRenderAsTEX')) {
		latex = latex.replaceAll('\\doNotRenderAsTEX', '');
		isKatex = false;
	}

	$: katexString = isKatex ? katex.renderToString(latex, options) : latex;
</script>

{#if isKatex}
	{@html katexString}
{:else}
	<p>{latex}</p>
{/if}

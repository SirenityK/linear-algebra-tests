<script lang="ts">
	import Matrix from '$lib/matrix.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	const examples = [
		[1, 2, 3],
		[[1], [2], [3]],
		[
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]
	];
</script>

<h1 class="text-4xl text-center">Algebra Lineal</h1>
<p>
	El algebra lineal es una rama de las matemáticas que busca comprender los vectores, matrices,
	sistemas de ecuaciones lineales y en general espacios vectoriales y sus transformaciones lineales.
</p>
<div>
	<p>Este es el programa que la maestra:</p>
	<div class="grid grid-flow-col justify-start items-center gap-3">
		<img
			src="https://lh3.googleusercontent.com/a-/ALV-UjVd7HbNYSKjecp9RNi5DioAgCXaEmqyeY0D_vZwItS46VqZJzU=s32-c"
			alt="elena"
			class="rounded-full inline-block"
		/>
		<p>Elena Haydee Ortíz García</p>
	</div>
	<p class="m-2">pidió realizar.</p>
</div>
<p>
	Fue desarrollado por Dariel Fierro; para la materia de Algebra Lineal, en ITM campus Mexicali.
</p>

<h1>Programado en:</h1>
<ul class="list-disc list-inside">
	<li>Svelte - <span class="text-gray-500">Página web</span></li>
	<li>Python - <span class="text-gray-500">Motor de cálculo</span></li>
	<li>Rust - <span class="text-gray-500">Web Assembly</span></li>
</ul>

<Separator />
<h1 class="text-2xl">Ejemplos para introducir matrices o vectores:</h1>
<h2>Al escribir uno de estos:</h2>
<ul class="list-disc list-inside">
	{#each examples as arr}
		<li>{JSON.stringify(arr)}</li>
	{/each}
</ul>
<h2>Se comprenderá como:</h2>
{#each examples as arr}
	<Matrix matrix={arr} options={{ displayMode: false }} />
{/each}
<p>Entiendo que es bastante escritura, pero es lo que hay, no logré hacer algo interactivo</p>

<div class="index">
	<h1 class="text-3xl">Indice de contenidos</h1>
	<Separator class="my-4" />
	<ul>
		<li><a href="/calculo/independencia">Independencia lineal</a></li>
		<li><a href="/calculo/combinacion">Combinación lineal</a></li>
		<!-- <li><a href="/base">Base y dimensión</a></li> -->
		<li><a href="/ortogonalizacion">Ortogonalización de Gram-Schmidt</a></li>
	</ul>
</div>

<style lang="postcss">
	.index li {
		@apply list-disc ml-6;
	}

	.index a {
		@apply text-blue-500 hover:underline;
	}
</style>

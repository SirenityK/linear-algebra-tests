<script lang="ts">
	import { K_OPTIONS } from '$lib';
	import Katex from './katex.svelte';

	type Array1 = (number | string)[];
	type Array2 = Array1[];
	type Array2D1D = Array1 | Array2;

	export let matrix: Array2D1D;
	export let transpose = false;
	export let options = K_OPTIONS;

	let proxy: Katex;

	function is_2D(array: Array2D1D): array is Array2 {
		return Array.isArray(array[0]);
	}

	function column(arr: Array2, index: number) {
		return arr.map((row) => row[index]);
	}

	function columns(arr: Array2) {
		return arr[0].map((_, i) => column(arr, i));
	}

	function _transpose(arr: Array2D1D) {
		return is_2D(arr) ? columns(arr) : arr.map((v) => [v]);
	}

	function matrix_to_katex(array: Array2D1D) {
		const IS2D = is_2D(array);
		let separator = IS2D ? '\\\\' : '&';
		if (transpose) {
			array = _transpose(array);
			if (!IS2D) {
				separator = '\\\\';
			}
		}

		const withClass = (val: number | string) => {
			return `\\htmlClass{numbers}${val}`;
		};

		return (
			`{\\begin{bmatrix}` +
			array
				.map((v, _) => {
					if (IS2D) {
						return (v as Array1).map((v) => withClass(v)).join('&');
					}
					return withClass(v as number | string);
					// return IS2D ? (v as Array1).join(' & ') : v;
				})
				.join(separator) +
			'\\end{bmatrix}}'
		);
	}

	export function getNode() {
		return proxy.getNode();
	}

	export function isMounted() {
		return proxy.isMounted();
	}
</script>

<Katex
	bind:this={proxy}
	latex={matrix_to_katex(matrix)}
	options={{
		...options,
		trust: true,
		strict: false
	}}
/>

// place files you want to import through the `$lib` alias in this folder.
import type { KatexOptions } from 'katex';
export * from './algebra';
export const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';

export const K_OPTIONS: KatexOptions = {
	displayMode: true,
	throwOnError: false,
	trust: false,
};

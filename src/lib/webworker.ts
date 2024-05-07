import { PYODIDE_URL } from '$lib';
import { expose } from 'comlink';
import type { PyodideInterface } from 'pyodide';
import initPy from '$lib/python/worker.py?raw';

/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare function importScripts(...urls: string[]): void;
declare function loadPyodide(): Promise<PyodideInterface>;

importScripts(PYODIDE_URL);

let pyodide: PyodideInterface;

export async function init() {
	pyodide = await loadPyodide();

	const origLoadPackage = pyodide.loadPackage;
	pyodide.loadPackage = function (pkgs, options) {
		return origLoadPackage(pkgs, {
			messageCallback: () => {},
			errorCallback: () => {},
			...options
		});
	};

	await pyodide.loadPackage(['sympy', 'micropip', 'numpy']);
	const micropip = pyodide.pyimport('micropip');
	await micropip.install(
		`http://${new URL(import.meta.url).hostname}:8080/boringcalculator-1.0-cp311-cp311-emscripten_3_1_46_wasm32.whl`
	);
	await pyodide.runPythonAsync(initPy);
}

const isReady = init();

export const python = {
	async run(arg: string, func: string) {
		await isReady;
		return pyodide.runPythonAsync(`
			_calculate("${arg}", function='${func}', latex=True)[${func === 'integrate' ? 'integral' : func}]
		`);
	},
	async runCustom(code: string) {
		await isReady;
		return pyodide.runPythonAsync(code);
	}
};

export type WorkerItem = typeof python;

expose(python);

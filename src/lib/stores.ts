import type { Remote } from 'comlink';
import { writable } from 'svelte/store';
import type { WorkerItem } from './webworker';
import type { Writable } from 'svelte/store';

type pyFunction =
	| 'withoutRender'
	| 'is_linearly_independent'
	| 'find_scalars'
	| 'format_vectors'
	| 'nothing';

export const instance: Writable<Remote<WorkerItem> | undefined> = writable(undefined);
export const pyFunction: Writable<pyFunction> = writable('nothing');
export const input = writable('')
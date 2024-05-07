export function combinarLineal(vectores: number[][], escalares: number[]) {
	if (vectores.length !== escalares.length) {
		throw new Error('La cantidad de vectores y escalares debe ser la misma.');
	}

	let combinacion = vectores[0].map(() => 0); // Crear un vector inicial con ceros

	for (let i = 0; i < vectores.length; i++) {
		const vector = vectores[i];
		const escalar = escalares[i];

		combinacion = combinacion.map((valor, index) => valor + vector[index] * escalar);
	}

	return combinacion;
}

export function esLinealmenteIndependiente(vectores: number[][]) {
	// Construir una matriz con los vectores
	let matriz = vectores[0].map((_, i) => vectores.map((vector) => vector[i]));

	// Reducir la matriz a su forma escalonada de fila
	matriz = reducirMatriz(matriz);

	// Comprobar si la matriz tiene una fila de ceros
	for (let i = 0; i < matriz.length; i++) {
		if (matriz[i].every((val) => val === 0)) {
			return false; // Se encontró una fila de ceros, por lo tanto es dependiente
		}
	}

	return true;
}

// Función auxiliar para reducir una matriz a su forma escalonada de fila
export function reducirMatriz(matriz: number[][]) {
	// Clonar la matriz para evitar mutaciones
	const clon = matriz.map((fila) => fila.slice());
	const filas = clon.length;
	const columnas = clon[0].length;

	for (let i = 0; i < filas - 1; i++) {
		for (let j = i + 1; j < filas; j++) {
			if (clon[j][i] !== 0) {
				const factor = clon[j][i] / clon[i][i];
				for (let k = i; k < columnas; k++) {
					clon[j][k] -= factor * clon[i][k];
				}
			}
		}
	}

	return clon;
}

export function gramSchmidt(vectores: number[][]): number[][] {
	const baseOrtonormal: number[][] = [];

	for (let i = 0; i < vectores.length; i++) {
		let vector: number[] = vectores[i];

		// Restar la proyección de vector sobre cada vector base
		for (let j = 0; j < i; j++) {
			vector = restarProyeccion(vector, baseOrtonormal[j]);
		}

		// Normalizar el vector resultante
		const norma: number = Math.sqrt(
			vector.reduce((acum: number, val: number) => acum + val * val, 0)
		);
		if (norma === 0) continue; // Si la norma es 0, el vector es 0 y no se incluye
		const vectorNormalizado: number[] = vector.map((val: number) => val / norma);

		baseOrtonormal.push(vectorNormalizado);
	}

	return baseOrtonormal;
}

export function restarProyeccion(vector: number[], base: number[]): number[] {
	const productoPunto = vector.reduce((acum, val, i) => acum + val * base[i], 0);
	const normaBase = base.reduce((acum, val) => acum + val * val, 0);
	const proyeccion = base.map((val) => (productoPunto / normaBase) * val);

	return vector.map((val, i) => val - proyeccion[i]);
}

export function arrayToLatexMatrix(arr: number[]) {
	// example for arr: [1,2,3]
	// output: \begin{pmatrix} 1 & 2 & 3 \end{pmatrix}
	return `\\begin{pmatrix} ${arr.join(' \\\\ ')} \\end{pmatrix}`;
}

export function addOperatorToEach(arr: number[], operator: string) {
	return arr.map((val) => `${operator}${val}`);
}

export function appendBetween(arr: string[] | number[], operator: string): (string | number)[] {
	const res = [];
	for (let i = 0; i < arr.length; i++) {
		if (i !== 0 && i !== arr.length) {
			res.push(operator);
		}
		if (Array.isArray(arr[i])) res.push(arrayToLatexMatrix(arr[i]));
		else res.push(arr[i]);
	}
	return res;
}

export function appendKatex(...append: string[] | number[]) {
	let latex = '';
	for (let text of append) {
		if (Array.isArray(text)) {
			text = arrayToLatexMatrix(text);
		}
		latex += `${text}`;
	}
	return latex;
}

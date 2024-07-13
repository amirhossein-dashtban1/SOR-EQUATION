import {
	identityMatrix,
	transpose,
	sum,
	product,
	scalarProduct,
} from "../matrix-utilities/utility.js";

function QRDecomposition(matrix) {
	let n = matrix.length;
	let R = scalarProduct(1, matrix);
	let Q = identityMatrix(n);
	for (let i = 0; i < n - 1; i++) {
		let d = [];
		for (let j = i; j < n; j++) d.push(R[j][i]);
		let S =
			Math.sqrt(d.reduce((sum, x) => sum + x ** 2, 0)) *
			(d[0] > 0 ? -1 : 1);
		let v0 = Math.sqrt((1 / 2) * (1 - d[0] / S));
		let b = -S * v0;
		let v = [[v0]];
		for (let j = 1; j < n - i; j++) v.push([d[j] / (2 * b)]);
		v.unshift(...new Array(i).fill([0]));
		let vvt = product(v, transpose(v));
		let Pi = sum(identityMatrix(n), scalarProduct(-2, vvt));
		R = product(Pi, R);
		Q = product(Q, Pi);
	}
	return [Q, R];
}

export { QRDecomposition };

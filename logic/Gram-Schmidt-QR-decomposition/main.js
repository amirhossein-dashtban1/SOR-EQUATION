import {
	transpose,
	product,
	orthogonalization,
	unify,
} from "../matrix-utilities/utility.js";

function QRDecomposition(A_) {
	let A = A_;
	let n = A.length;
	let Q = transpose(orthogonalization(transpose(A)).map((v) => unify(v)));

	let R = [];
	for (let i = 0; i < n; i++) {
		R[i] = [];
		for (let j = 0; j < n; j++) {
			if (j >= i)
				R[i][j] = product(
					[transpose(A)[j]],
					transpose([transpose(Q)[i]])
				)[0][0];
			else R[i][j] = 0;
		}
	}
	return [Q, R];
}

export { QRDecomposition };

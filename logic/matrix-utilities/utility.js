function identityMatrix(n) {
    const identityMatrix = [];
    for (let i = 0; i < n; i++) {
        identityMatrix.push([]);
        for (let j = 0; j < n; j++) {
            identityMatrix[i][j] = i === j ? 1 : 0;
        }
    }
    return identityMatrix
}

function norm_inf(x0, x1) {
    let norm = 0;
    let newDif;
    for (let i = 0; i < x0.length; i++) {
        if((newDif = Math.abs(x0[i] - x1[i])) > norm)
            norm = newDif;
    }
    return norm;
}

function norm2(x) {
    let norm = 0;
    for (let minor of x) norm += minor ** 2;
    norm = Math.sqrt(norm);
    return norm;
}


function inverse(matrix) {
    const n = matrix.length;

    // Create an identity matrix of the same size as the input matrixش
    const I = identityMatrix(n);

    // Augment the input matrix with the identity matrix
    let augmentedMatrix = [];
    for (let i = 0; i < n; i++) {
        augmentedMatrix[i] = matrix[i].concat(I[i]);
    }

    // Perform Gaussian elimination
    for (let i = 0; i < n; i++) {
        // Make the diagonal contain all 1's
        let diagElement = augmentedMatrix[i][i];
        if (diagElement === 0) {
            // Swap with a row below if the diagonal element is zero
            for (let k = i + 1; k < n; k++) {
                if (augmentedMatrix[k][i] !== 0) {
                    [augmentedMatrix[i], augmentedMatrix[k]] = [
                        augmentedMatrix[k],
                        augmentedMatrix[i],
                    ];
                    diagElement = augmentedMatrix[i][i];
                    break;
                }
            }
        }
        for (let j = 0; j < 2 * n; j++) {
            augmentedMatrix[i][j] /= diagElement;
        }

        // Make all rows above and below the current row contain 0 in the current column
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                let factor = augmentedMatrix[k][i];
                for (let j = 0; j < 2 * n; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
        }
    }

    // Extract the right half of the augmented matrix, which is now the inverse matrix
    let inverseMatrix = [];
    for (let i = 0; i < n; i++) {
        inverseMatrix[i] = augmentedMatrix[i].slice(n, 2 * n);
    }

    return inverseMatrix;
}

function transpose(A) {
    let B = [];
    for (let i = 0; i < A[0].length; i++) {
        B[i] = [];
        for (let j = 0; j < A.length; j++)
            B[i][j] = A[j][i];
    }
    return B;

}

function sum(A, B) {
    let C = [];
    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < A[0].length; j++)
            C[i][j] = A[i][j] + B[i][j]
    }
    return C;
}

function product(A, B) {
    let C = [];
    for (let i = 0; i < A.length; i++) {
        C[i] = [];
        for (let j = 0; j < B[0].length; j++) {
            let minor = 0;
            for (let k = 0; k < A[0].length; k++) minor += A[i][k] * B[k][j];
            C[i][j] = minor;
        }
    }
    return C;
}

function scalarProduct(c, A) {
    let B = [];
    for (let i = 0; i < A.length; i++) {
        B[i] = [];
        for (let j = 0; j < A[0].length; j++)
            B[i][j] = c * A[i][j];
    }
    return B;
}

function lowerTriangular(A) {
    const L = [];
    for (let i = 0; i < A.length; i++) {
        L.push([]);
        for (let j = 0; j < A.length; j++) {
            if (i > j) L[i][j] = A[i][j];
            else L[i][j] = 0;
        }
    }
    return L;
}

function diagonal(A) {
    const D = [];
    for (let i = 0; i < A.length; i++) {
        D.push([]);
        for (let j = 0; j < A.length; j++) {
            if (i === j) D[i][j] = A[i][j];
            else D[i][j] = 0;
        }
    }
    return D;
}

function upperTriangular(A) {
    const U = [];
    for (let i = 0; i < A.length; i++) {
        U.push([]);
        for (let j = 0; j < A.length; j++) {
            if (i < j) U[i][j] = A[i][j];
            else U[i][j] = 0;
        }
    }
    return U
}

function orthogonalization(vectors_) {
    let vectors = vectors_.map(vector => [vector])
    let OrthogonalVectors = [];
    for (let vector of vectors) {
        let newU = vector;
        for (let u of OrthogonalVectors) {
            let temp = scalarProduct(product(vector, transpose(u))[0] / product(u, transpose(u))[0], u)
            newU = sum(newU, scalarProduct(-1, temp));
        }
        OrthogonalVectors.push(newU)
    }
    OrthogonalVectors = OrthogonalVectors.map(v => v[0])
    return OrthogonalVectors;
}

function unify(x) {
    let norm2X = norm2(x);
    let unified = x.map(minor => minor / norm2X);
    return unified;
}

function show(A) {
    let str = ''
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            let minor = A[i][j];
            if (Math.abs(minor) < 0.00000001) minor = 0.0
            let s = minor.toFixed(5).toString().padStart(9, ' ');
            str += s + "  "
        }
        str += "\n"
    }
    console.log(str);
}

export {
    identityMatrix,
    norm_inf,
    norm2,
    inverse,
    transpose,
    sum,
    product,
    scalarProduct,
    lowerTriangular,
    diagonal,
    upperTriangular,
    orthogonalization,
    unify,
    show
};
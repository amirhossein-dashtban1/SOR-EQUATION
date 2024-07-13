import {
    norm_inf,
    inverse,
    sum,
    product,
    scalarProduct,
    lowerTriangular,
    diagonal,
    upperTriangular,
    show
} from "../matrix-utilities/utility.js";


function SOR(A, b, w = 1.25, e = 0.0001, x_0 = new Array(b.length).fill([0])) {
    const L = lowerTriangular(A);
    const D = diagonal(A);
    const U = upperTriangular(A);

    let xk_1 = x_0;
    let x_k
    let norm;
    do {
        let D_wL_inv = inverse(sum(D, scalarProduct(w, L)));
        let pro1 = sum(scalarProduct((1 - w), D), scalarProduct(-w, U));
        let repMat = product(D_wL_inv, pro1);
        let repMat_x0 = product(repMat, xk_1);
        let c = product(scalarProduct(w, D_wL_inv), b);
        x_k = sum(repMat_x0, c);

        norm = norm_inf(x_k, xk_1);
        xk_1 = x_k;

        console.log("--------------------");
        show(x_k);
        console.log(norm);

    } while(norm > e);
    return x_k;
}

const matrix = [
    [3, -1, 1],
    [-1, 3, -1],
    [1, -1, 3],
];
const b = [[-1], [7], [-7]];

export {SOR};
import { QRDecomposition } from "./logic/Householder-QR-decomposition/main.js";
import { QRDecomposition as QRDecompositionWithGramSchmidt } from "./logic/Gram-Schmidt-QR-decomposition/main.js";

window.addEventListener("load", (event) => {
	let dimentionButton = document.querySelector(
		".linear-system__dimention-btn"
	);
	let dimentionInput = document.querySelector(
		".linear-system__dimention-input"
	);
	let form = document.querySelector("#frmMain");
	let rowContainer = document.querySelectorAll(".linear-system__matrix");
	let resultRowContainer = document.querySelectorAll(".result-container");
	let inputs;
	// let outputs;

	let dim = [0, 0, 0];

	dimentionButton.addEventListener("click", () => {
		const dimValue = Number(dimentionInput.value);
		dim = new Array(dimValue).fill(0);

		rowContainer[0].innerHTML = "";
		rowContainer[0].insertAdjacentHTML(
			"beforeend",
			dim
				.map(
					(_, i) =>
						`<div class="linear-system__matrix-row">${dim
							.map(
								(_, j) =>
									`<input class="linear-system__matrix-input" type="text" />`
							)
							.join("")}</div>`
				)
				.join("")
		);
		inputs = document.querySelectorAll(".linear-system__matrix-input");
	});

	form.addEventListener("submit", (event) => {
		let inputs = event.target.querySelectorAll("input");
		inputs = Array.from(inputs);
		let matrix = inputs.slice(0, -2);
		let buttons = inputs.slice(-2);
		buttons.forEach((input) => input.classList.remove("selected"));
		event.submitter.classList.add("selected");

		let matrixInput = [];
		for (let i = 0; i < dim.length; i++) {
			matrixInput[i] = [];
			for (let j = 0; j < dim.length; j++) {
				matrixInput[i][j] = Number(matrix[i * dim.length + j].value);
			}
		}

		const [Q, R] =
			event.submitter.id === "gramschmidt-btn"
				? QRDecomposition(matrixInput)
				: QRDecompositionWithGramSchmidt(matrixInput);

		insertMatrixToDOM(Q, resultRowContainer[0]);
		insertMatrixToDOM(R, resultRowContainer[1]);

		let outputs = document.querySelectorAll(
			".linear-system__matrix-output"
		);
	});
});

function insertMatrixToDOM(matrix, matrixContainer) {
	matrixContainer.classList.add("linear-system__matrix");
	matrixContainer.innerHTML = "";
	matrixContainer.insertAdjacentHTML(
		"beforeend",
		matrix
			.map(
				(_, i) =>
					`<div class="linear-system__matrix-row">${matrix[0]
						.map(
							(_, j) =>
								`<div class="linear-system__matrix-output">${matrix[
									i
								][j].toFixed(5)}</div>`
						)
						.join("")}</div>`
			)
			.join("")
	);
}

// try {
//     let knownXs = form.knownXs.value;
//     let functionRule = form.functionRule.value;
//     let knownValues = form.knownValues.value;
//     let { mySplineStr, chartData } = solve({
//         knownXs,
//         functionRule,
//         knownValues,
//     });
//     update({ mySplineStr, chartData });
// } catch (e) {
//     console.log(e);
// }

// function insertMatrixToDOM(matrix, matrixContainer) {
// 	matrix.map((_, i) => {
// 		matrixContainer.insertAdjacentHTML(
// 			"beforeend",
// 			`<div class="linear-system__matrix-row">${matrix[0]
// 				.map(
// 					(_, j) =>
// 						`<div class="linear-system__matrix-output">${matrix[i][j]}</div>`
// 				)
// 				.join("")}</div>`
// 		);
// 	});
// }

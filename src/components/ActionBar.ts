import { resetError, showError } from "../utils";
import { getLogoFromLocalStorage } from "./Image";
import { addRowHandler } from "./ProductsTable";

const onPreviewClick = () => {
	const previewBtn = document.getElementById("js-preview-btn") as HTMLButtonElement;

	previewBtn.addEventListener("click", () => {
		resetError();
		getLogoFromLocalStorage() ? document.body.classList.toggle("x-preview") : showError();
	})
}

const onAddProductClick = () => {
	const addBtn = document.getElementById("js-add-btn") as HTMLButtonElement;

	addBtn.addEventListener("click", () => {
		addRowHandler();
	});
}

const onPrintClick = () => {
	const printBtn = document.getElementById("js-print-btn") as HTMLButtonElement;

	printBtn.addEventListener("click", () => {
		resetError();
		getLogoFromLocalStorage() ? window.print() : showError();
	})
}

export const initActionBar = () => {
	onAddProductClick()
	onPrintClick()
	onPreviewClick()
}

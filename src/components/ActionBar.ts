import { addRowHandler } from "./ProductsTable";
import { isImageUploaded } from "./Image";
import { addProductBtn, errorMessage, previewBtn, printBtn } from "./Selectors";

const previewHandler = () => {
	isImageUploaded() ? document.body.classList.toggle("x-preview") : revealError();
}

const printHandler = () => {
	isImageUploaded() ? window.print() : revealError();
}

const scrollToError = () => {
	return window.scroll(0, errorMessage.offsetTop - 100);
}

const revealError = () => {
	errorMessage.classList.remove("hidden");
	scrollToError();
}

export const initActionBar = () => {
	addProductBtn.addEventListener("click", () => {
		addRowHandler();
	});
	printBtn.addEventListener("click", () => {
		printHandler();
	});
	previewBtn.addEventListener("click", () => {
		previewHandler();
	});
}

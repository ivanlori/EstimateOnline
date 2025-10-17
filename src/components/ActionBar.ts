import { addRowHandler } from "./ProductsTable";
import { isImageUploaded } from "./Image";
import { errorMessage } from "./Selectors";

const onPreviewClick = () => {
	const previewBtn = document.getElementById("js-preview-btn") as HTMLButtonElement;

	previewBtn.addEventListener("click", () => {
		isImageUploaded() ? document.body.classList.toggle("x-preview") : revealError();
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
		isImageUploaded() ? window.print() : revealError();
	})
}

const revealError = () => {
	errorMessage.classList.remove("hidden");
	scrollToError();
}

const scrollToError = () => {
	return window.scroll(0, errorMessage.offsetTop - 100);
}

export const initActionBar = () => {
	onAddProductClick()
	onPrintClick()
	onPreviewClick()
}

import { getElement } from "../libs/utils";
import ProductsTable from "./ProductsTable";
import ImageUploader from "./Image";

class ActionBar {
	$addProductBtn = getElement("#js-add-btn");
	$printBtn = getElement("#js-print-btn");
	$previewBtn = getElement("#js-preview-btn");

	constructor() {
		const table = new ProductsTable();
		const image = new ImageUploader();

		this.$addProductBtn.addEventListener("click", () => {
			table.addProduct();
		});
		this.$printBtn.addEventListener("click", () => {
			this.printHandler(image);
		});
		this.$previewBtn.addEventListener("click", () => {
			this.previewHandler(image);
		});
	}

	previewHandler(instance: any) {
		if (instance.isImageUploaded()) {
			getElement("body").classList.toggle("x-preview");
		} else {
			getElement(".x-logo-error").classList.remove("hidden");
			this.scrollToError();
		}
	}

	printHandler(instance: any) {
		if (instance.isImageUploaded()) {
			window.print();
		} else {
			getElement(".x-logo-error").classList.remove("hidden");
			this.scrollToError();
		}
	}

	scrollToError() {
		return window.scroll(0, ".x-logo-error");
	}
}

export default ActionBar;

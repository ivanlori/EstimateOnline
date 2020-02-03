import { $ } from "../libs/utils";
import ProductsTable from "./ProductsTable";
import ImageUploader from "./Image";

class ActionBar {
	private $addProductBtn: HTMLButtonElement = $("#js-add-btn");
	private $printBtn: HTMLButtonElement = $("#js-print-btn");
	private $previewBtn: HTMLButtonElement = $("#js-preview-btn");

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
			$("body").classList.toggle("x-preview");
		} else {
			$(".x-logo-error").classList.remove("hidden");
			this.scrollToError();
		}
	}

	printHandler(instance: any) {
		if (instance.isImageUploaded()) {
			window.print();
		} else {
			$(".x-logo-error").classList.remove("hidden");
			this.scrollToError();
		}
	}

	scrollToError() {
		return window.scroll(0, ".x-logo-error");
	}
}

export default ActionBar;

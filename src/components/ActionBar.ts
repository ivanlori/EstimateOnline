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
			table.addRowHandler();
		});
		this.$printBtn.addEventListener("click", () => {
			this.printHandler(image);
		});
		this.$previewBtn.addEventListener("click", () => {
			this.previewHandler(image);
		});
	}

	revealError = () => {
		$(".x-logo-error").classList.remove("hidden");
		this.scrollToError();
	}

	previewHandler(instance: any) {
		instance.isImageUploaded() ? $("body").classList.toggle("x-preview") : this.revealError();
	}

	printHandler(instance: any) {
		instance.isImageUploaded() ? window.print() : this.revealError();
	}

	scrollToError() {
		return window.scroll(0, ".x-logo-error");
	}
}

export default ActionBar;

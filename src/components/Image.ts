import { $ } from "../libs/utils";

class ImageUploader {
	private $imgBlank: HTMLInputElement = $("#js-image-blank");
	private $logoImageField: HTMLInputElement = $("#js-logo-image");
	private isLogoUploaded: boolean = false;

	constructor() {
		this.$logoImageField.addEventListener("change", (e: any) => {
			this.changeImageHandler(e);
		});

		this.setImage();
	}

	changeImageHandler = (e: HTMLInputElement) => {
		let imgData = this.getBase64Image(e);
		localStorage.setItem("imgData", String(imgData));
		this.isLogoUploaded = true;
	};

	getBase64Image = (e: any) => {
		/**
		 * Thanks to: https://stackoverflow.com/questions/33024630/html5-canvas-conversion-of-image-file-to-dataurl-throws-uncaught-typeerror
		 *
		 * This converts an image into base 64 format
		 * and then is possible to retrieve via local storage
		 */
		const logo = this.$imgBlank;

		let ctx = logo.getContext("2d"),
			img = new Image();

		img.onload = () => {
			logo.height = img.height > 150 ? 80 : img.height;

			logo.width = img.width;
			ctx.drawImage(img, 0, 0);
		};

		img.src = URL.createObjectURL(e.target.files[0]);
		logo.classList.remove("hidden");

		return img;
	};

	getImageFromStorage = () => {
		return localStorage.getItem("imgData");
	};

	setImage = () => {
		this.$imgBlank.src = "data:image/png;base64," + this.getImageFromStorage();
	};

	isImageUploaded = (): boolean => {
		return this.isLogoUploaded;
	};
}

export default ImageUploader;

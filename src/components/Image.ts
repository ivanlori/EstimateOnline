import { imgBlank, logoImageField } from "./Selectors";

let isLogoUploaded = false;

const changeImageHandler = (e: HTMLInputElement) => {
	let imgData = getBase64Image(e);
	localStorage.setItem("imgData", String(imgData));
	isLogoUploaded = true;
}

const getBase64Image = (e: HTMLInputElement) => {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext("2d");
	const img = new Image();

	img.onload = () => {
		canvas.height = img.height > 150 ? 80 : img.height;
		canvas.width = img.width;

		if (ctx) {
			ctx.drawImage(img, 0, 0);
		}

		imgBlank.src = canvas.toDataURL();
		imgBlank.classList.remove("hidden");
	}

	if (e.files && e.files[0]) {
		img.src = URL.createObjectURL(e.files[0]);
	}

	return img;
}

const getImageFromLocalStorage = () => {
	return localStorage.getItem("imgData");
}

const setImageAsBase64 = () => {
	imgBlank.src = "data:image/png;base64," + getImageFromLocalStorage();
}

export const isImageUploaded = (): boolean => {
	return isLogoUploaded;
}

export const initImageUploader = () => {

	logoImageField.addEventListener("change", (e: Event) => {
		changeImageHandler(e.currentTarget as HTMLInputElement);
	});

	setImageAsBase64();
}

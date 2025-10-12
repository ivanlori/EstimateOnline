import { $ } from "../libs/utils";

export const datepicker = $(".js-datepicker") as HTMLElement;
export const vatField = $("#js-vat") as HTMLInputElement;
export const addressField = $(".js-company-address") as HTMLInputElement;
export const discountField = $(".js-discount") as HTMLInputElement;
export const tBodySelector = $("#js-tbody");
export const addProductBtn = $("#js-add-btn") as HTMLButtonElement;
export const printBtn = $("#js-print-btn") as HTMLButtonElement;
export const previewBtn = $("#js-preview-btn") as HTMLButtonElement;
export const errorMessage = $(".x-logo-error") as HTMLElement;
export const imgBlank  = $("#js-image-blank") as HTMLImageElement;
export const logoImageField = $("#js-logo-image") as HTMLInputElement;

export const vat = $("#js-vat-display") as HTMLInputElement;
export const subtotal = $("#js-subtotal") as HTMLElement;
export const total = $("#js-total") as HTMLElement;

"use strict";

import "./styles/main.scss";

import { setVat, calculateDiscount, $ } from "./libs/utils";
import ProductsTable from "./components/ProductsTable";
import ActionBar from "./components/ActionBar";
import Image from "./components/Image";

(function() {
	const $datepicker: HTMLElement = $(".js-datepicker");
	const $vat: HTMLElement = $(".js-vat");
	const $displayVatEl: HTMLElement = $(".js-vat-display");
	const $addressInputField: HTMLInputElement = $(".js-company-address");
	const $discount: HTMLInputElement = $(".js-discount");

	$addressInputField.addEventListener("focusin", (e: any) => {
		e.target.classList.add("expand");
	});

	$discount.addEventListener("keyup", (e: any) => {
		calculateDiscount(e.target.value, 1300);
	});

	$vat.addEventListener("keyup", (e: any) => {
		setVat($displayVatEl, e.target.value);
	});

	// Thanks to -> https://github.com/chmln/flatpickr
	/*flatpickr($datepicker, {
		dateFormat: "d-m-Y"
	});*/

	new Image();
	new ProductsTable();
	new ActionBar();
})();

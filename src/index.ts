/**
 * @Author: Ivan Lori
 * @Description: An online estimate of costs
 *
 * My experiment with new features from ES6 and the new grid system
 * for responsive purposes
 *
 * The code style which I adopted is from AirBnb
 * references to: https://github.com/airbnb/javascript
 *
 * Application entry point
 */

"use strict";

// Load application styles
import "./styles/main.scss";

import {
	calculateVat,
	setVat,
	calculateDiscount,
	getElement
} from "./libs/utils";
import ProductsTable from "./components/ProductsTable";
import ActionBar from "./components/ActionBar";
import Image from "./components/Image";

(function() {
	const $datepicker = getElement(".js-datepicker");
	const $vat = getElement(".js-vat");
	const $displayVatEl = getElement(".js-vat-display");
	const $addressInputField: HTMLInputElement = getElement(
		".js-company-address"
	);
	const $discount: HTMLInputElement = getElement(".js-discount");
	const $estimateSubtotal = getElement(".js-estimate-subtotal");
	const $estimateTotal = getElement(".js-estimate-total");

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

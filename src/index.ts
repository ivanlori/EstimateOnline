"use strict";

import "./styles/main.scss";

import { displayValue, calculateDiscount } from "./libs/utils";
import * as el from "./components/Selectors";
import ProductsTable from "./components/ProductsTable";
import ActionBar from "./components/ActionBar";
import Image from "./components/Image";

(() => {
	new Image();
	const productsTable = new ProductsTable();
	new ActionBar();

	el.$addressInputField.addEventListener("focusin", (e: any) => {
		e.target.classList.add("expand");
	});

	el.$discountField.addEventListener("keyup", (e: any) => {
		calculateDiscount(productsTable.calculateSubtotal(), e.target.value);
		productsTable.calculateTotal();
	});

	el.$vatField.addEventListener("keyup", (e: any) => {
		displayValue(el.$displayVatEl, e.target.value);
		productsTable.calculateTotal();
	});

	// Thanks to -> https://github.com/chmln/flatpickr
	/*flatpickr($datepicker, {
		dateFormat: "d-m-Y"
	});*/
})();

"use strict";

import "./styles/main.scss";

import { displayValue, calculateDiscount } from "./libs/utils";
import * as el from "./components/Selectors";
import ProductsTable from "./components/ProductsTable";
import ActionBar from "./components/ActionBar";
import Image from "./components/Image";

(function() {
	el.$addressInputField.addEventListener("focusin", (e: any) => {
		e.target.classList.add("expand");
	});

	el.$discountField.addEventListener("keyup", (e: any) => {
		calculateDiscount(e.target.value, 1300);
	});

	el.$vatField.addEventListener("keyup", (e: any) => {
		displayValue(el.$displayVatEl, e.target.value);
	});

	// Thanks to -> https://github.com/chmln/flatpickr
	/*flatpickr($datepicker, {
		dateFormat: "d-m-Y"
	});*/

	new Image();
	new ProductsTable();
	new ActionBar();
})();

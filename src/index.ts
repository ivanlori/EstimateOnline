"use strict";

import { calculateDiscount, calculateSubtotal } from "./libs/utils";
import {
	addressField,
	discountField,
	vat,
	datepicker,
	vatField,
} from "./components/Selectors";
import { calculateTotal, initTable } from "./components/ProductsTable";
import { initActionBar } from "./components/ActionBar";
import { initImageUploader } from "./components/Image";

import "./styles/normalize.css";
import "./styles/main.css";

(() => {
	initActionBar();
	initImageUploader();
	initTable()

	addressField.addEventListener("focusin", (e: FocusEvent) => {
		const target = e.target as HTMLElement;
		target.classList.add("expand");
	});

	discountField.addEventListener("keyup", (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		const sub = calculateSubtotal()
		calculateDiscount(sub, parseFloat(target.value));
		calculateTotal();
	});

	vatField.addEventListener("keyup", (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		vat.innerHTML = target.value;
		calculateTotal();
	});

	//@ts-ignore
	flatpickr(datepicker, {
		dateFormat: "d-m-Y"
	});
})();

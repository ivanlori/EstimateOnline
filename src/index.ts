"use strict";

import { calculateDiscount, calculateSubtotal } from "./libs/utils";
import {
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

const recalculateTotalOnDiscountChange = () => {
	discountField.addEventListener("keyup", (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const subtotal = calculateSubtotal();
			calculateDiscount(subtotal, parseFloat(e.target.value));
			calculateTotal();
		}
	})
}

const recalculateTotalOnVatChange = () => {
	vatField.addEventListener("keyup", (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) {
			vat.innerHTML = e.target.value;
			calculateTotal();
		}
	})
}

(() => {
	initActionBar()
	initImageUploader()
	initTable()
	recalculateTotalOnDiscountChange()
	recalculateTotalOnVatChange()

	//@ts-ignore
	flatpickr(datepicker, {
		dateFormat: "d-m-Y"
	})

})()

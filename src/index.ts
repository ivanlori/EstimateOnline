"use strict";

import { calculateTotalWithDiscount, recalculateTotalOnVatChange } from "./utils";
import { discountField, datepicker } from "./components/Selectors";
import { initTable } from "./components/ProductsTable";
import { initActionBar } from "./components/ActionBar";
import { initImageUploader } from "./components/Image";

import "./styles/normalize.css";
import "./styles/main.css";

const recalculateTotalOnDiscountChange = () => {
	discountField.addEventListener("keyup", (e: KeyboardEvent) => {
		if (e.target instanceof HTMLInputElement) {
			calculateTotalWithDiscount();
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

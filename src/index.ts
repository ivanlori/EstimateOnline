"use strict";

import { setTotalOnVatOrDiscountChange } from "./utils";
import { initTable } from "./components/ProductsTable";
import { initActionBar } from "./components/ActionBar";
import { initImageUploader } from "./components/Image";

import "./styles/normalize.css";
import "./styles/main.css";

(() => {
	initActionBar()
	initImageUploader()
	initTable()
	setTotalOnVatOrDiscountChange()

	//@ts-ignore
	flatpickr(document.getElementById('js-datepicker'), {
		dateFormat: "d-m-Y"
	})

})()

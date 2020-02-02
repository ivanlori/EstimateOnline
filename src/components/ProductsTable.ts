import {
	getElement,
	calculateAmountPerRow,
	calculateTotalAmount,
	validateField
} from "../libs/utils";

class ProductsTable {
	$selectBox = getElement(".js-select");
	$quantityEl = getElement(".js-input-quantity");
	$unityEl = getElement(".js-input-unity");
	$amountEl = getElement(".js-input-amount");

	constructor() {
		this.$quantityEl.addEventListener("keyup", () => {
			this.onQuantityHandler(this.$quantityEl, this.$unityEl, this.$amountEl);
		});
	}

	isDataTableValid = (id: number): boolean => {
		let isValid: boolean = false;
		let setId: number = id === 0 ? 0 : id;

		let $selectEl: HTMLSelectElement = getElement(
			`#js-select-product-${setId}`
		);
		let $unityEl: HTMLInputElement = getElement(`#js-unity-product-${setId}`);
		let $amountEl: HTMLInputElement = getElement(`#js-amount-product-${setId}`);
		let $quantityEl: HTMLInputElement = getElement(
			`#js-quantity-product-${setId}`
		);

		isValid = validateField(parseInt($selectEl.value), $selectEl);
		isValid = validateField(parseInt($unityEl.value), $unityEl);
		isValid = validateField(parseInt($quantityEl.value), $quantityEl);
		isValid = validateField(parseInt($amountEl.value), $amountEl);

		return isValid;
	};

	onQuantityHandler = (
		quantityField: HTMLInputElement,
		unityField: HTMLInputElement,
		amountField: HTMLInputElement
	) => {
		if (unityField.value === "") return;

		const amountPerRow = calculateAmountPerRow(
			parseInt(quantityField.value),
			parseInt(unityField.value)
		);

		amountField.value = String(amountPerRow);
	};

	/**
	 * @param elementChildType
	 * @param colClassAttr
	 * @param nameAttr
	 * @param placeholderAttr
	 * @returns Col table with element in it
	 */
	createColTable(
		elementChildType,
		colClassAttr,
		elemClassAttr,
		idAttr,
		placeholderAttr
	) {
		let $td = document.createElement("td"),
			$elem = document.createElement(elementChildType),
			$euroSymbol = document.createElement("span");

		if (elementChildType === "select") {
			let items = {
				"0": "-- Select --",
				"1": "Service",
				"2": "Hours",
				"3": "Days",
				"4": "Product"
			};

			for (let key in items) {
				if (items.hasOwnProperty(key)) {
					let $option = document.createElement("option");

					$option.setAttribute("value", key);
					$option.innerHTML = items[key];
					$elem.appendChild($option);
				}
			}
		}

		$td.setAttribute("class", colClassAttr);

		$elem.setAttribute("class", elemClassAttr);
		$elem.setAttribute("id", idAttr);
		$elem.setAttribute("placeholder", placeholderAttr);

		if ($elem.classList.contains("js-input-amount")) {
			$euroSymbol.setAttribute("class", "amount-euro");
			$td.appendChild($euroSymbol);
		}

		$td.appendChild($elem);

		return $td;
	}

	createRowTable(id) {
		let $row = document.createElement("tr"),
			$deleteRowBtn = document.createElement("i");

		$deleteRowBtn.setAttribute("class", "icon-minus");
		$deleteRowBtn.setAttribute("id", id);

		$row.classList.add("row");

		$row.appendChild(
			this.createColTable(
				"select",
				"js-select-wrapper col small",
				"js-select",
				`js-select-product-${id}`,
				`js-select-product-${id}`
				//"-- Select --"
			)
		);
		$row.appendChild(
			this.createColTable(
				"textarea",
				"col large",
				"js-input-description table-field",
				`js-description-product-${id}`,
				""
			)
		);
		$row.appendChild(
			this.createColTable(
				"input",
				"col small",
				"js-input-unity table-field",
				`js-unity-product-${id}`,
				"0.00"
			)
		);
		$row.appendChild(
			this.createColTable(
				"input",
				"col small",
				"js-input-quantity table-field",
				`js-quantity-product-${id}`,
				"0"
			)
		);
		$row.appendChild(
			this.createColTable(
				"input",
				"amount-col col small",
				"js-input-amount table-field",
				`js-amount-product-${id}`,
				"0.00"
			)
		);

		$row.appendChild($deleteRowBtn);
		$row.setAttribute("id", id);

		return $row;
	}

	addProduct() {
		console.log("product added");
	}
}

export default ProductsTable;

import {
	$,
	calculateAmountPerRow,
	calculateTotalAmount,
	validateField
} from "../libs/utils";

class ProductsTable {
	private $selectBox: HTMLSelectElement = $(".js-select");
	private $quantityEl = $(".js-input-quantity");
	private $unityEl: HTMLInputElement = $(".js-input-unity");
	private $amountEl: HTMLInputElement = $(".js-input-amount");
	private $tableBody: any = $(".js-tbody");
	private id: number = 0;

	constructor() {
		this.$tableBody.innerHTML = this.createRow(this.id);

		$("body").addEventListener("focusout", (e: any) => {
			this.onQuantityHandler(e);
		});
	}

	isDataTableValid = (id: number): boolean => {
		let isValid: boolean = false;
		let setId: number = id === 0 ? 0 : id;

		let $selectEl: HTMLSelectElement = $(`#js-select-product-${setId}`);
		let $unityEl: HTMLInputElement = $(`#js-unity-product-${setId}`);
		let $amountEl: HTMLInputElement = $(`#js-amount-product-${setId}`);
		let $quantityEl: HTMLInputElement = $(`#js-quantity-product-${setId}`);

		isValid = validateField(parseInt($selectEl.value), $selectEl);
		isValid = validateField(parseInt($unityEl.value), $unityEl);
		isValid = validateField(parseInt($quantityEl.value), $quantityEl);
		isValid = validateField(parseInt($amountEl.value), $amountEl);

		return isValid;
	};

	onQuantityHandler = (target: Event) => {
		console.log(target);
		/*if (unityField.value === "") return;

		const amountPerRow = calculateAmountPerRow(
			parseInt(quantityField.value),
			parseInt(unityField.value)
		);

		amountField.value = String(amountPerRow);
		*/
	};

	createRow = (id: number): string => {
		return `<tr class="row">
		<td class="js-select-wrapper col small">
			<select id="js-select-product-${id}" class="js-select">
				<option value="0">-- Select --</option>
				<option value="1">Service</option>
				<option value="2">Hours</option>
				<option value="3">Days</option>
				<option value="4">Product</option>
			</select>
		</td>
		<td class="col large">
			<textarea id="js-description-product-${id}" class="js-input-description table-field"></textarea>
		</td>
		<td class="col small">
			<input id="js-unity-product-${id}" class="js-input-unity table-field" type="text" placeholder="0.00">
		</td>
		<td class="col small">
			<input id="js-quantity-product-${id}" class="js-input-quantity table-field" type="text" placeholder="0">
		</td>
		<td class="amount-col col small">
			<span class="amount-euro"></span>
			<input id="js-amount-product-${id}" class="js-input-amount table-field" type="text" placeholder="0.00">
		</td>
	</tr>`;
	};

	addProduct() {
		if (this.isDataTableValid(this.id)) {
			this.id += 1;
			this.$tableBody.insertAdjacentHTML("beforeend", this.createRow(this.id));
		}
	}
}

export default ProductsTable;

import {
	$,
	calculateAmountPerRow,
	isFieldValid,
	displayValue,
	calculateTotalAmount,
	calculateSubtotal
} from "../libs/utils";

import {
	$vatField,
	$subtotal,
	$total,
	$discountField
} from "../components/Selectors";

class ProductsTable {
	private $tableBody: any = $("#js-tbody");
	private id: number = 0;
	private selectorStringUnity: string = "#js-unity-";
	private selectorStringQuantity: string = "#js-quantity-";
	private selectorStringSelect: string = "#js-select-";

	constructor() {
		this.$tableBody.innerHTML = this.createRow(this.id);

		let $selectEl = $(this.selectorStringSelect + this.id);
		let $unityEl = $(this.selectorStringUnity + this.id);
		let $quantityEl = $(this.selectorStringQuantity + this.id);

		document.body.addEventListener("keyup", (e: any) => {
			if (e.target.id === `js-quantity-${this.id}`) {
				$selectEl = $(this.selectorStringSelect + this.id);
				$unityEl = $(this.selectorStringUnity + this.id);
				$quantityEl = $(this.selectorStringQuantity + this.id);

				this.onQuantityHandler(e, $unityEl);
			}
		});

		document.body.addEventListener("click", (e: any) => {
			e.target.id === `js-delete-${this.id}` && this.removeRowHandler();
		});
	}

	onQuantityHandler = (e: any, unityEl: HTMLInputElement): void => {
		let value = unityEl.value || null;

		let id = e.target.attributes[0].value;

		const amountPerRow = calculateAmountPerRow(
			parseInt(e.target.value),
			parseInt(value)
		);

		!isNaN(amountPerRow) && $(`#js-amount-${id}`).setAttribute("value", `${String(amountPerRow)}€`);
	};

	isRowFilled = (): boolean => {
		let isValid: boolean = false;

		return (isValid =
			isFieldValid(
				$(this.selectorStringSelect + this.id).value,
				$(this.selectorStringSelect + this.id)
			) &&
			isFieldValid(
				parseInt($(this.selectorStringUnity + this.id).value),
				$(this.selectorStringUnity + this.id)
			) &&
			isFieldValid(
				parseInt($(this.selectorStringQuantity + this.id).value),
				$(this.selectorStringQuantity + this.id)
			));
	};

	createRow = (id: number): string => {
		return `
		<tr id="js-row-${id}">
			<td class="col small">
				<select class="js-select" id="js-select-${id}">
					<option value="0">-- Select --</option>
					<option value="1">Service</option>
					<option value="2">Hours</option>
					<option value="3">Days</option>
					<option value="4">Product</option>
				</select>
			</td>
			<td class="col large">
				<textarea class="js-description" value=""></textarea>
			</td>
			<td class="col small">
				<input id="js-unity-${id}" class="js-unity" type="number" placeholder="0.00" value="">
			</td>
			<td class="col small">
				<input data-id="${id}" id="js-quantity-${id}" class="js-quantity" type="number" placeholder="0" value="">
			</td>
			<td class="amount-col col small">
				<input id="js-amount-${id}" class="js-amount" placeholder="0.00" readonly value="">
			</td>
			${
			id !== 0
				? `<td class="remove-wrapper"><i id="js-delete-${id}" class="js-delete icon icon-minus"></i></td>`
				: ""
			}
		</tr>`;
	};

	calculateSubtotal = (): any => {
		return displayValue(
			$subtotal,
			`${calculateSubtotal(document.querySelectorAll(".js-amount")).toFixed(
				2
			)}€`
		);
	};

	calculateTotal = (): any => {
		return displayValue(
			$total,
			`${calculateTotalAmount(
				document.querySelectorAll(".js-amount"),
				parseFloat($vatField.value),
				parseFloat($discountField.value)
			).toFixed(2)}€`
		);
	};

	addRowHandler = (): void => {
		if (this.isRowFilled()) {
			this.id += 1;
			this.$tableBody.insertAdjacentHTML("beforeend", this.createRow(this.id));

			this.calculateSubtotal();
			this.calculateTotal();
		}
	};

	removeRowHandler = (): void => {
		const $row = $(`#js-row-${this.id}`);
		$row.parentNode.removeChild($row);
		this.id -= 1;

		this.calculateSubtotal();
		this.calculateTotal();
	};
}

export default ProductsTable;

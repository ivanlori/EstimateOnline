import {
	$,
	calculateAmountPerRow,
	calculateTotalAmount,
	calculateSubtotal
} from "../libs/utils";

import {
	vat,
	subtotal,
	total,
	discountField,
	tBodySelector,
} from "../components/Selectors";

let rowId = 0;

const getSelectSelector = () => $(`#js-select-${getRowId()}`) as HTMLSelectElement | null;
const getQuantitySelector = () => $(`#js-quantity-${getRowId()}`) as HTMLInputElement | null;
const getUnitySelector = () => $(`#js-unity-${getRowId()}`) as HTMLInputElement | null;
const getRowSelector = () => $(`#js-row-${rowId}`) as HTMLElement | null;
const getAmountSelector = () => $(`#js-amount-${getRowId()}`) as HTMLElement | null;
const setSubtotal = (value: number) => subtotal.innerText = `${value}€`;
const setTotal = (value: number) => total.innerText = `${value}€`;
const setRowId = (value: number) => rowId = value;
const getRowId = (): number => rowId;

const removeRowHandler = () => {
	const row = getRowSelector()
	row?.parentNode?.removeChild(row);
	setRowId(getRowId() - 1);

	calculateSubtotal();
	calculateTotal();
}

const isRowFilled = (): boolean => {
	const selectValue = getSelectSelector()?.value
	const unityValue = getUnitySelector()?.value
	const quantityValue = getQuantitySelector()?.value

	if (selectValue && unityValue && quantityValue) {
		return true
	}

	return false
}

const handleOnBodyClickEvent = () => {
	document.body.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		target.id === `js-delete-${getRowId()}` && removeRowHandler();
	});
}

const handleOnBodyKeyUpEvent = () => {
	let select = getSelectSelector();
	let unity = getUnitySelector();
	let quantity = getQuantitySelector();

	document.body.addEventListener("keyup", (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		if (target.id === `js-quantity-${getRowId()}`) {
			select = getSelectSelector();
			unity = getUnitySelector();
			quantity = getQuantitySelector();

			onQuantityHandler(e, unity as HTMLInputElement);
		}
	});
}

const onQuantityHandler = (e: KeyboardEvent, unityEl: HTMLInputElement): void => {
	let value = unityEl.value || null;

	const target = e.target as HTMLInputElement;
	let id = target.attributes[0].value;

	const amountPerRow = calculateAmountPerRow(
		Number(target.value),
		Number(value)
	);

	!isNaN(amountPerRow) && getAmountSelector()?.setAttribute("value", `${String(amountPerRow)}€`);
}

const createRow = (): string => (
	`<tr id="js-row-${getRowId()}">
		<td class="col small">
			<select class="js-select" id="js-select-${getRowId()}">
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
			<input id="js-unity-${getRowId()}" class="js-unity" type="number" placeholder="0.00" value="">
		</td>
		<td class="col small">
			<input data-id="${getRowId()}" id="js-quantity-${getRowId()}" class="js-quantity" type="number" placeholder="0" value="">
		</td>
		<td class="amount-col col small">
			<input id="js-amount-${getRowId()}" class="js-amount" placeholder="0.00" readonly value="">
		</td>
		${handleRenderDelete()}
	</tr>
	`
);

const handleRenderDelete = (): string => (
	getRowId() !== 0
	? (`<td class="remove-wrapper">
				<i id="js-delete-${getRowId()}" class="js-delete icon icon-minus"></i>
			</td>`)
	: ''
)

export const initTable = () => {
	if (tBodySelector) {
		tBodySelector.innerHTML = createRow();
	}

	handleOnBodyKeyUpEvent()
	handleOnBodyClickEvent()
}

export const calculateTotal = (): void => {
	const value = calculateTotalAmount(
		document.querySelectorAll(".js-amount"),
		parseFloat(vat.value),
		parseFloat(discountField.value)
	).toFixed(2)

	setTotal(Number(value))
};

export const addRowHandler = () => {
	if (isRowFilled()) {
		setRowId(getRowId() + 1);

		tBodySelector?.insertAdjacentHTML("beforeend", createRow());

		calculateSubtotal();
		calculateTotal();
	} else {
		// addError()
	}
}

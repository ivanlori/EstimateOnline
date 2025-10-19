import {
	$,
	calculateAmountPerRow,
	addErrorClass,
	setSubtotal,
	removeErrorClass
} from "../utils";

let rowId = 0;

const getQuantitySelector = () => $(`#js-quantity-${getRowId()}`) as HTMLInputElement | null;
const getUnitySelector = () => $(`#js-unity-${getRowId()}`) as HTMLInputElement | null;
const getRowSelector = () => $(`#js-row-${rowId}`) as HTMLElement | null;
const getAmountSelector = () => $(`#js-amount-${getRowId()}`) as HTMLElement | null;
const setRowId = (value: number) => rowId = value;
const getRowId = (): number => rowId;

const removeRowHandler = () => {
	const row = getRowSelector()
	row?.parentNode?.removeChild(row);
	setRowId(getRowId() - 1);

	setSubtotal();
}

const isRowFilled = (): boolean => {
	const unityValue = getUnitySelector()?.value
	const quantityValue = getQuantitySelector()?.value

	return !!unityValue && !!quantityValue
}

const handleOnBodyClickEvent = () => {
	document.body.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		target.id === `js-delete-${getRowId()}` && removeRowHandler();
	});
}

const handleOnBodyKeyUpEvent = () => {
	document.body.addEventListener("keyup", (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;

		if (target.id === `js-quantity-${getRowId()}`) {
			onQuantityHandler(target.value);
		}
	})
}

const onQuantityHandler = (quantityValue: string): void => {
	const unityEl = getUnitySelector();

	const value = unityEl?.value || null;

	const amountPerRow = calculateAmountPerRow(
		Number(quantityValue),
		Number(value)
	)

	getAmountSelector()?.setAttribute("value", `${String(amountPerRow)}€`);
}

const createRow = (): string => (
	`<tr data-testid="row" id="js-row-${getRowId()}">
		<td class="col small">
			<select name="products" class="js-select" id="js-select-${getRowId()}" aria-label="product type">
				<option value="0">-- Select --</option>
				<option value="1">Service</option>
				<option value="2">Hours</option>
				<option value="3">Days</option>
				<option value="4">Product</option>
			</select>
		</td>
		<td class="col large">
			<textarea class="product-description" name="description" aria-label="description"></textarea>
		</td>
		<td class="col small">
			<input data-testid="unity-${getRowId()}" id="js-unity-${getRowId()}" class="js-unity" name="unity" type="number" placeholder="0.00" value="" aria-label="unity">
		</td>
		<td class="col small">
			<input data-testid="quantity-${getRowId()}" id="js-quantity-${getRowId()}" class="js-quantity" name="quantity" type="number" placeholder="0" value="" aria-label="quantity">
		</td>
		<td class="amount-col col small">
			<input data-testid="amount-${getRowId()}" id="js-amount-${getRowId()}" class="js-amount" name="amount" placeholder="0.00" readonly value="" aria-label="amount">
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
	handleOnBodyKeyUpEvent()
	handleOnBodyClickEvent()
}

export const addRowHandler = () => {
	if (isRowFilled()) {
		removeErrorClass(getRowId())

		setRowId(getRowId() + 1);

		(document.getElementById("js-tbody") as HTMLBodyElement).insertAdjacentHTML("beforeend", createRow());
		setSubtotal();
	} else {
		addErrorClass(getRowId())
	}
}

export const resetRowId = () => {
	rowId = 0;
}

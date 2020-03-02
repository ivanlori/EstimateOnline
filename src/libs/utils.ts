export const $ = (selectorString: any): any => {
	return document.querySelector(selectorString);
};

export const calculateAmountPerRow = (
	unity: number,
	quantity: number
): number => {
	return unity * quantity;
};

export const calculateVat = (subtotal: number, vat: number): number => {
	return (subtotal * vat) / 100;
};

export const displayValue = (element: HTMLElement, value: string): void => {
	element.innerText = value ? value : "0";
};

export const isSetValue = (element: HTMLInputElement): boolean => {
	return Boolean(element.value);
};

export const calculateDiscount = (
	subtotal: number,
	discount: number
): number => {
	return (discount / 100) * subtotal;
};

export const calculateSubtotal = (selectorsArray: any): number => {
	let sum = 0;

	// Iterate over all amount and sum
	selectorsArray.forEach(element => {
		element.value ? sum += parseFloat(element.value) : null;
	});

	return sum;
};

export const calculateTotalAmount = (
	selectorsArray: any,
	vat: number,
	discount: number
): number => {
	let subtotal = calculateSubtotal(selectorsArray);
	return (
		subtotal +
		((vat ? calculateVat(subtotal, vat) : 0) -
			(discount ? calculateDiscount(subtotal, discount) : 0))
	);
};

const addError = el => {
	el.classList.add("error");
	return false;
}

const removeError = el => {
	el.classList.remove("error");
	return true;
}

export const isFieldValid = (
	value: number,
	elemContainer: HTMLElement
): boolean => {
	return value && value != 0 ? removeError(elemContainer) : addError(elemContainer);
};

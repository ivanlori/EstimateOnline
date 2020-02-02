export const getElement = (selectorString: any): any => {
	return document.querySelector(selectorString);
};

export const calculateAmountPerRow = (
	unity: number,
	quantity: number
): number => {
	return unity * quantity;
};

export const calculateVat = (vat: number, subtotal: number): number => {
	return (subtotal * vat) / 100;
};

export const setVat = (element: HTMLElement, vat: string): void => {
	element.innerText = vat;
};

export const calculateDiscount = (
	discount: number,
	subtotal: number
): number => {
	return (discount / 100) * subtotal;
};

export const calculateTotalAmount = (
	selectorsArray: [HTMLElement],
	vat: number,
	discount?: number
): string => {
	let sum = 0;

	// Iterate over all amount and sum
	selectorsArray.forEach(element => {
		sum += parseFloat(element.nodeValue);
	});

	return `${sum + vat - discount}€`;
};

export const validateField = (
	value: number,
	elemContainer: HTMLElement
): boolean => {
	if (isNaN(value) || value === 0) {
		elemContainer.classList.add("error");
		return false;
	} else {
		elemContainer.classList.remove("error");
		return true;
	}
};

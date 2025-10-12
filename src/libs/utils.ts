type selectorTypes = HTMLButtonElement | HTMLInputElement |  HTMLElement | HTMLInputElement | HTMLSelectElement| null

export const $ = (selectorString: string): selectorTypes => {
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

export const calculateDiscount = (
	subtotal: number,
	discount: number
): number => {
	return (discount / 100) * subtotal;
};

export const calculateSubtotal = (): number => {
	const amountList = document.querySelectorAll(".js-amount");
	let sum = 0;

	amountList.forEach((element) => {
		const inputElement = element as HTMLInputElement;
		inputElement.value ? sum += parseFloat(inputElement.value) : null;
	});

	return sum;
};

export const calculateTotalAmount = (
	selectorsArray: NodeListOf<Element>,
	vat: number,
	discount: number
): number => {
	let subtotal = calculateSubtotal();
	return (
		subtotal +
		((vat ? calculateVat(subtotal, vat) : 0) -
			(discount ? calculateDiscount(subtotal, discount) : 0))
	);
};

const addError = (el: HTMLElement): boolean => {
	el.classList.add("error");
	return false;
}

const removeError = (el: HTMLElement): boolean => {
	el.classList.remove("error");
	return true;
}

export const isFieldValid = (
	value: number,
	elemContainer: HTMLElement
): boolean => {
	return value && value !== 0 ? removeError(elemContainer) : addError(elemContainer);
};

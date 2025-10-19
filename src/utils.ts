type selectorTypes = HTMLButtonElement | HTMLInputElement |  HTMLElement | HTMLInputElement | HTMLSelectElement| null

export const $ = (selectorString: string): selectorTypes => {
	return document.querySelector(selectorString);
};

export const getVatValue = (): number => {
	return Number((document.getElementById('js-vat') as HTMLInputElement).value)
}

export const setVatValue = () => {
	const vatValue = getVatValue();
	(document.getElementById('js-vat-display') as HTMLElement).innerHTML = vatValue.toString();
}

export const getDiscountValue = (): number => {
	return Number((document.getElementById('js-discount') as HTMLInputElement).value)
}

export const getSubtotalValue = (): number => {
	return Number((document.getElementById('js-subtotal') as HTMLInputElement).value)
}

export const calculateAmountPerRow = (
	unity: number,
	quantity: number
): number => {
	return unity * quantity;
}

export const calculateTotalWithVat = (): number => {
	const subtotal = getSubtotalValue();
	const vat = getVatValue();

	return (subtotal * vat) / 100;
}

export const calculateTotalWithDiscount = (): number => {
	const discount = getDiscountValue();
	const subtotal = getSubtotalValue();

	return (discount / 100) * subtotal;
}

export const calculateAndSetSubtotal = () => {
	const amountList = document.querySelectorAll(".js-amount");
	let sum = 0;

	amountList.forEach((element) => {
		const inputElement = element as HTMLInputElement;
		inputElement.value ? sum += parseFloat(inputElement.value) : 0;
	});

	(document.getElementById('js-subtotal') as HTMLInputElement).value = sum.toFixed(2);
}

export const calculateTotalWithVatAndDiscount = (): number => {
	const subtotal = getSubtotalValue();
	const discountAmount = calculateTotalWithDiscount();
	const subtotalAfterDiscount = subtotal - discountAmount;
	const vat = getVatValue();
	const vatAmount = (subtotalAfterDiscount * vat) / 100;

	return subtotalAfterDiscount + vatAmount;
}

export const addErrorClass = (id: number) => {
	document.getElementById(`js-row-${id}`)?.classList.add("error");
}

export const removeErrorClass = (id: number) => {
	document.getElementById(`js-row-${id}`)?.classList.remove("error");
}

export const recalculateTotalOnVatChange = () => {
	const vatField = document.getElementById("js-vat") as HTMLInputElement;

	vatField.addEventListener("keyup", (e: KeyboardEvent) => {
		setVatValue();
		calculateTotalWithVat();
	})
}

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

export const getDiscountAmount = (): number => {
	const discount = getDiscountValue();
	const subtotal = getSubtotalValue();

	return (discount / 100) * subtotal;
}

export const setSubtotal = () => {
	const amountList = document.querySelectorAll(".js-amount");
	let sum = 0;

	amountList.forEach((element) => {
		const inputElement = element as HTMLInputElement;
		inputElement.value ? sum += parseFloat(inputElement.value) : 0;
	});

	(document.getElementById('js-subtotal') as HTMLInputElement).value = sum.toFixed(2);
}

export const getTotalWithVatAndDiscount = (): number => {
	const subtotal = getSubtotalValue();
	const discountAmount = getDiscountAmount();
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

export const setTotalOnVatOrDiscountChange = () => {
	const vatField = document.getElementById("js-vat") as HTMLInputElement;
	const discountField = document.getElementById("js-discount") as HTMLInputElement;
	const totalDisplay = document.getElementById("js-total") as HTMLInputElement;

	const updateTotal = () => {
		setVatValue();
		const total = getTotalWithVatAndDiscount();
		totalDisplay.value = total.toFixed(2);
	};

	vatField.addEventListener("keyup", updateTotal);
	discountField.addEventListener("keyup", updateTotal);
}

export const getErrorMessage = () => document.getElementById("js-logo-error");

export const showError = () => {
	const errorMessage = getErrorMessage();

	if (errorMessage) {
		errorMessage.classList.remove("hidden");
		window.scroll(0, errorMessage.offsetTop - 100);
	}
}

export const resetError = () => {
	const errorMessage = getErrorMessage();

	errorMessage?.classList.add("hidden");
}

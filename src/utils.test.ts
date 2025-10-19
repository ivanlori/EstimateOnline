import { describe, test, expect } from '@jest/globals';
import {
	calculateAmountPerRow, calculateAndSetSubtotal, calculateTotalWithVatAndDiscount,
	getDiscountValue, getSubtotalValue, calculateTotalWithVat, getVatValue
} from './utils';

describe('utils', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
	});

  test('should calculate amount correctly', () => {
		expect(calculateAmountPerRow(10, 5)).toBe(50);
	});

	test('should get subtotal', () => {
		document.body.innerHTML = `
			<input id="js-subtotal" value="30" />
		`;
		expect(getSubtotalValue()).toBe(30);
	});

	test('should get vat', () => {
		document.body.innerHTML = `
			<input id="js-vat" value="22" />
		`;
		expect(getVatValue()).toBe(22);
	});

	test('should get discount', () => {
		document.body.innerHTML = `
			<input id="js-discount" value="3" />
		`;
		expect(getDiscountValue()).toBe(3);
	});

	test('should calculate total with VAT', () => {
		document.body.innerHTML = `
			<input id="js-subtotal" value="100" />
			<input id="js-vat" value="22" />
		`;

		expect(calculateTotalWithVat()).toBe((100 * 22) / 100);
	});

	test('should calculate total with VAT and Discount', () => {
		document.body.innerHTML = `
			<input id="js-subtotal" value="100" />
			<input id="js-vat" value="22" />
			<input id="js-discount" value="3" />
		`;

		const subtotal = 100;
		const discountAmount = (3 / 100) * subtotal;
		const subtotalAfterDiscount = subtotal - discountAmount;
		const vatAmount = (subtotalAfterDiscount * 22) / 100;
		const expectedTotal = subtotalAfterDiscount + vatAmount;

		expect(calculateTotalWithVatAndDiscount()).toBe(expectedTotal);
	});

	test('should calculate subtotal', () => {
		document.body.innerHTML = `
			<input id="js-amount-1" class="js-amount" value="22" />
			<input id="js-amount-2" class="js-amount" value="3" />
			<input id="js-amount-3" class="js-amount" value="10" />
			<input id="js-subtotal" value="0" />
		`;

		calculateAndSetSubtotal()

		expect(document.getElementById('js-subtotal')).toHaveProperty('value', '35.00');
	});

});

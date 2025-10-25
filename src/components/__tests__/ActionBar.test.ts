import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { initTable } from '../ProductsTable';
import { initActionBar } from '../ActionBar';
import * as fs from 'fs';
import * as path from 'path';

const mockPrintFn = jest.fn();

window.print = mockPrintFn;

describe('ActionBar', () => {

	const getPreviewBtn = () => screen.getByRole('button', { name: /preview/i });
	const getPrintBtn = () => screen.getByRole('button', { name: /print/i });

	beforeEach(() => {
		mockPrintFn.mockClear();

		const html = fs.readFileSync(
			path.resolve(__dirname, '../../../index.html'),
			'utf8'
		);

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		document.body.innerHTML = doc.body.innerHTML;

		initTable();
		initActionBar();
	})

	afterEach(() => {
		document.body.innerHTML = '';
		jest.restoreAllMocks();
	})

	test('trigger the browser print function when print button is clicked', async () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('data:image/png;base64,mock-logo-data');

		await userEvent.click(getPrintBtn());

		expect(mockPrintFn).toHaveBeenCalled();
	})

	test('trigger preview mode when preview button is clicked', async () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('data:image/png;base64,mock-logo-data');

		await userEvent.click(getPreviewBtn());

		expect(document.body.classList.contains('x-preview')).toBe(true);
	})

	test('do NOT trigger preview mode if logo is missing and preview button is clicked', async () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

		document.body.classList.remove('x-preview');

		await userEvent.click(getPreviewBtn());

		expect(document.body.classList.contains('x-preview')).toBe(false);
	})

	test('do NOT trigger print function if logo is missing and print button is clicked', async () => {
		jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

		await userEvent.click(getPrintBtn());

		expect(mockPrintFn).not.toHaveBeenCalled();
	})
})

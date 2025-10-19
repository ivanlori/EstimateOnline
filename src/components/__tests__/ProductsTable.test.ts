import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import { initTable, resetRowId } from '../ProductsTable';
import * as fs from 'fs';
import * as path from 'path';
import { initActionBar } from '../ActionBar';
import { recalculateTotalOnVatChange } from '../../utils';

describe('ProductsTable component', () => {
	beforeEach(() => {
		const html = fs.readFileSync(
			path.resolve(__dirname, '../../../index.html'),
			'utf8'
		);

		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		document.body.innerHTML = doc.body.innerHTML;

		initTable();
		initActionBar();
		recalculateTotalOnVatChange();
		resetRowId();
	})

	afterEach(() => {
		document.body.innerHTML = '';
	})

	test('display the calculated amount per row after set unity and quantity', async () => {
		const user = userEvent.setup();

		const unityInput = screen.getByTestId('unity');
		const quantityInput = screen.getByTestId('quantity');
		const amountInput = screen.getByTestId('amount') as HTMLInputElement;

		await user.clear(unityInput);
		await user.type(unityInput, '10');

		await user.clear(quantityInput);
		await user.type(quantityInput, '5');

		expect(amountInput.value).toBe('50€');
	})

	test('the row should have class error amount or unity are empty', async () => {
		const user = userEvent.setup();

		const unityInput = screen.getByTestId('unity');
		const quantityInput = screen.getByTestId('quantity');
		const row = screen.getByTestId('row');

		await user.clear(unityInput);
		await user.clear(quantityInput);
		await user.click(screen.getByRole('button', { name: /add item/i }));

		expect(row).toHaveClass('error');
	})

	test('add a new row', async () => {
		const user = userEvent.setup();

		const unityInput = screen.getByTestId('unity');
		const quantityInput = screen.getByTestId('quantity');

		await user.clear(unityInput);
		await user.type(unityInput, '10');

		await user.clear(quantityInput);
		await user.type(quantityInput, '5');
		await user.click(screen.getByRole('button', { name: /add item/i }));

		await waitFor(() => {
			expect(screen.getAllByTestId('row')[1]).toBeInTheDocument();
		})
	})

	test('display vat number after set it in vat field', async () => {
		const user = userEvent.setup();

		const vatField = screen.getByLabelText('VAT')
		const vatDisplay = screen.getByTestId('vat-display')

		await user.clear(vatField);
		await user.type(vatField, '22');

		expect(vatDisplay).toHaveTextContent('22');
	})

	test('display the subtotal when all amount per rows are set', async () => {
		const user = userEvent.setup();

		const firstRowUnityInput = screen.getByTestId('unity');
		const firstRowQuantityInput = screen.getByTestId('quantity');
		const subtotalInput = screen.getByTestId('subtotal') as HTMLInputElement;
		const addBtn = screen.getByRole('button', { name: /add item/i })

		await user.clear(firstRowUnityInput);
		await user.type(firstRowUnityInput, '10');

		await user.clear(firstRowQuantityInput);
		await user.type(firstRowQuantityInput, '5');

		await user.click(addBtn);

		const secondRowUnityInput = screen.getByTestId('unity-1') as HTMLInputElement;
		const secondRowQuantityInput = screen.getByTestId('quantity-1') as HTMLInputElement;

		await user.clear(secondRowUnityInput);
		await user.type(secondRowUnityInput, '2');

		await user.clear(secondRowQuantityInput);
		await user.type(secondRowQuantityInput, '3');

		await user.click(addBtn);

		expect(subtotalInput.value).toBe('56.00');
	})
})

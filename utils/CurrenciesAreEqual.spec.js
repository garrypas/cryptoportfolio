"use strict";

import currenciesAreEqual from './CurrenciesAreEqual';

describe('CurrenciesAreEqual', () => {
	it('False when different', () => {
		const areEqual = currenciesAreEqual('XRP', 'BTC');
        expect(areEqual).toBeFalsy();
	});

	it('True when equal (case insensitive)', () => {
		const areEqual = currenciesAreEqual('xRp', 'XRP');
        expect(areEqual).toBeTruthy();
	});

	it('Tether and fiat equivalents are equal', () => {
		const areEqual = currenciesAreEqual('usDt', 'usD');
        expect(areEqual).toBeTruthy();
	});

	it('BCC and BCH are equal', () => {
		const areEqual = currenciesAreEqual('bCc', 'BCh');
        expect(areEqual).toBeTruthy();
	});
});
"use strict";

import cleanCurrency from './CleanCurrency';

describe('CleanCurrency', () => {
	[
		{ dirty: 'UsDt', clean: 'USD' },
		{ dirty: 'Bcc', clean: 'BCH' },
	].forEach(testData => {
		it(`Cleans ${testData.dirty}, converting it to ${testData.clean}`, () => {
			const clean = cleanCurrency(testData.dirty);
			expect(clean).toEqual(testData.clean);
		});
	});
});
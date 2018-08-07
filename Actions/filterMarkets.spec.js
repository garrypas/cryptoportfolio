"use strict";

import filterMarkets from './filterMarkets'

describe('filterMarkets', () => {
    it('Filters based on search text', done => {
        filterMarkets({
            items: [ 'BTC-ARK', 'BTC-LSK' ],
            searchText: 'ARK'
        }, result => {
            expect(result.suggestions).toHaveLength(1);
            expect(result.suggestions).toContain('BTC-ARK');            
            done();
        });
    });

    it('Filters case insensitive', done => {
        filterMarkets({
            items: [ 'BTC-ARK', 'BTC-LSK' ],
            searchText: 'aRk'
        }, result => {
            expect(result.suggestions).toHaveLength(1);
            expect(result.suggestions).toContain('BTC-ARK');
            done();
        });
    });

    ["", " "].forEach(blankish => {
        it(`Empty search string '${blankish}' returns an empty set of suggestions`, done => {
            filterMarkets({
                items: [ 'BTC-ARK', 'BTC-LSK' ],
                searchText: blankish
            }, result => {
                expect(result.suggestions).toHaveLength(0);
                done();
            });
        });
    });
});
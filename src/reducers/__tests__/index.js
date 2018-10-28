import chai from 'chai';
import {LatestRates} from 'revolut/lib/constants';
import {openExchangeRatesApiReducer} from '../index';

describe('"openExchangeRatesApiReducer" reducer should work as expected', () => {
    it('Should handle "LatestRates.FETCH_LOADED', () => {
        const baseCurrency = 'EUR';
        const rates = {
            GBP: 2.5,
        };

        chai.expect(
            openExchangeRatesApiReducer(undefined, {
                type: LatestRates.FETCH_LOADED,
                payload: {
                    baseCurrency,
                    rates,
                },
            }),
        ).deep.equal({
            rates: {
                [baseCurrency]: rates,
                GBP: {},
                USD: {},
            },
        });
    });
});

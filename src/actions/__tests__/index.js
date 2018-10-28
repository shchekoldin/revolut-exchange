import chai from 'chai';
import {LatestRates} from 'revolut/lib/constants';
import actions from '../index';

describe('Actions should produces correct objects', () => {
    it('Should create an action to fetch rates for specified currency', () => {
        const baseCurrency = 'EUR';
        const expectedAction = {
            type: LatestRates.FETCH,
            payload: {
                baseCurrency,
            },
        };

        chai.expect(actions.openExchangeRatesApi.fetchLatestRates(baseCurrency)).deep.equal(expectedAction);
    });
});

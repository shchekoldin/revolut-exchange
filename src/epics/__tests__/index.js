import {TestScheduler} from 'rxjs/testing';
import chai from 'chai';
import {LatestRates} from 'revolut/lib/constants';
import openExchangeRatesApi from '../../api/openExchangeRates';
import {fetchLatestRates} from '../index';

jest.mock('../../api/openExchangeRates');

describe('fetchLatestRates', () => {
    it('should emit a LatestRates.FETCH_LOADED action with the rates as a payload', () => {
        const testScheduler = new TestScheduler((actual, expected) => {
            chai.expect(actual).deep.equal(expected);
        });

        testScheduler.run(({hot, cold, expectObservable}) => {
            const baseCurrency = 'EUR';
            const rates = [];

            openExchangeRatesApi.getLatest.mockImplementation(() => cold('--a', {
                a: {
                    response: {
                        rates: [],
                    },
                },
            }));

            const action$ = hot('-a', {
                a: {
                    type: LatestRates.FETCH,
                    payload: {
                        baseCurrency,
                    },
                },
            });

            const output$ = fetchLatestRates(action$);

            expectObservable(output$).toBe('---a', {
                a: {
                    type: LatestRates.FETCH_LOADED,
                    payload: {
                        rates,
                        baseCurrency,
                    },
                },
            });
        });
    });
});

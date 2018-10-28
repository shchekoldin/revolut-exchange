import {combineEpics, ofType} from 'redux-observable';
import {
    exhaustMap,
    ignoreElements,
    map,
    mergeMap,
    switchMap,
    catchError,
} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {
    CurrencyExchange,
    LatestRates,
    UserAccount,
    Notifier,
} from 'revolut/lib/constants';
import api from 'revolut/api';

const {openExchangeRates} = api;

export const fetchLatestRates = (action$) => action$.pipe(
    ofType(LatestRates.FETCH),
    mergeMap((action) => openExchangeRates.getLatest(action.payload.baseCurrency).pipe(
        map(response => {
            const {rates} = response.response;

            logger.debug(`Rates for ${action.payload.baseCurrency} loaded`);

            return {
                type: LatestRates.FETCH_LOADED,
                payload: {
                    rates,
                    baseCurrency: action.payload.baseCurrency,
                },
            };
        }),
        catchError(() => {
            return of({
                type: Notifier.SHOW_NOTIFICATION,
                payload: {
                    text: 'Rates were loaded with error',
                },
            });
        }),
    )),
);

const pollLatestRates = (action$) => action$.pipe(
    ofType(LatestRates.POLL),
    switchMap(() => timer(0, 100000).pipe(
        exhaustMap(() => of(
            {
                type: LatestRates.FETCH,
                payload: {
                    baseCurrency: 'USD',
                },
            },
            {
                type: LatestRates.FETCH,
                payload: {
                    baseCurrency: 'EUR',
                },
            },
            {
                type: LatestRates.FETCH,
                payload: {
                    baseCurrency: 'GBP',
                },
            },
        )),
    )),
);

const addUserRate = (action$) => {
    return action$.pipe(
        ofType(CurrencyExchange.ADD_USER_RATE),
        map(() => {
            window.location.hash = '#/exchange/rates/';
        }),
        ignoreElements(),
    );
};

const exchange = (action$) => action$.pipe(
    ofType(CurrencyExchange.EXCHANGE),
    mergeMap((action) => {
        const {payload} = action;

        if (!payload.baseAmount || (payload.baseAmount <= 0)) {
            return of({
                type: Notifier.SHOW_NOTIFICATION,
                payload: {
                    text: 'Invalid amount',
                },
            });
        }

        const newBalance = {
            [payload.baseCurrency]: payload.balance[payload.baseCurrency] - payload.baseAmount,
            [payload.quoteCurrency]: payload.balance[payload.quoteCurrency] + (payload.baseAmount * payload.quoteRate),
        };

        if (payload.baseCurrency === payload.quoteCurrency) {
            return of({
                type: Notifier.SHOW_NOTIFICATION,
                payload: {
                    text: 'Can\'t exchange the same currency',
                },
            });
        }

        if (newBalance[payload.baseCurrency] < 0) {
            return of({
                type: Notifier.SHOW_NOTIFICATION,
                payload: {
                    text: 'Not enough funds',
                },
            });
        }

        return of(
            {
                type: Notifier.SHOW_NOTIFICATION,
                payload: {
                    text: 'Success',
                },
            },
            {
                type: UserAccount.UPDATE_BALANCE,
                payload: {
                    balance: newBalance,
                },
            },
            {
                type: CurrencyExchange.UPDATE_BASE_AMOUNT,
                payload: {
                    value: null,
                },
            },
        );
    }),
);

const removeOldNotification = (action$) => {
    return action$.pipe(
        ofType(Notifier.SHOW_NOTIFICATION),
        mergeMap(() => timer(5000).pipe(
            map(() => ({
                type: Notifier.REMOVE_OLD_NOTIFICATION,
            })),
        )),
    );
};

export default combineEpics(
    fetchLatestRates,
    pollLatestRates,
    addUserRate,
    exchange,
    removeOldNotification,
);

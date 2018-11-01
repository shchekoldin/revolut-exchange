import {combineEpics, ofType} from 'redux-observable';
import {
    catchError,
    exhaustMap,
    ignoreElements,
    map,
    mergeMap,
    switchMap,
} from 'rxjs/operators';
import {of, timer} from 'rxjs';
import {
    CurrencyExchange,
    LatestRates,
    NotificationMode,
    Notifier,
    UserAccount,
} from 'revolut/lib/constants';
import actions from 'revolut/actions';
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
            return of(actions.notifier.showNotification(
                'Rates were loaded with error',
                NotificationMode.ERROR,
            ));
        }),
    )),
);

const pollLatestRates = (action$) => action$.pipe(
    ofType(LatestRates.POLL),
    switchMap(() => timer(0, 10000).pipe(
        // TODO: Better to load at once
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
            return of(actions.notifier.showNotification(
                'Invalid amount',
                NotificationMode.ERROR,
            ));
        }

        const newBalance = {
            [payload.baseCurrency]: payload.balance[payload.baseCurrency] - payload.baseAmount,
            [payload.quoteCurrency]: payload.balance[payload.quoteCurrency] + (payload.baseAmount * payload.quoteRate),
        };

        if (payload.baseCurrency === payload.quoteCurrency) {
            return of(actions.notifier.showNotification(
                'Can\'t exchange the same currency',
                NotificationMode.ERROR,
            ));
        }

        if (newBalance[payload.baseCurrency] < 0) {
            return of(actions.notifier.showNotification(
                'Not enough funds',
                NotificationMode.ERROR,
            ));
        }

        return of(
            actions.notifier.showNotification('Success'),
            {
                type: UserAccount.UPDATE_BALANCE,
                payload: {
                    balance: newBalance,
                },
            },
            actions.currencyExchangeView.updateBaseAmount(null),
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

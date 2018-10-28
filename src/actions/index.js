// @flow
import {
    CurrencyExchange,
    LatestRates,
    Notifier,
} from 'revolut/lib/constants';

const openExchangeRatesApi = {
    fetchLatestRates: (baseCurrency: string) => ({
        type: LatestRates.FETCH,
        payload: {
            baseCurrency,
        },
    }),
    pollLatestRates: () => ({
        type: LatestRates.POLL,
    }),
};

const currencyExchangeView = {
    exchange: (
        baseCurrency: string,
        quoteCurrency: string,
        quoteRate: number,
        balance: number,
        baseAmount: number,
    ) => ({
        type: CurrencyExchange.EXCHANGE,
        payload: {
            baseCurrency,
            quoteCurrency,
            quoteRate,
            balance,
            baseAmount,
        },
    }),

    updateBaseAmount: (value: number) => ({
        type: CurrencyExchange.UPDATE_BASE_AMOUNT,
        payload: {
            value,
        },
    }),

    changeBaseCurrency: (currency: string) => ({
        type: CurrencyExchange.CHANGE_BASE_CURRENCY,
        payload: {
            currency,
        },
    }),

    changeQuoteCurrency: (currency: string) => ({
        type: CurrencyExchange.CHANGE_QUOTE_CURRENCY,
        payload: {
            currency,
        },
    }),
};

const addUserRateView = {
    addRate: (baseCurrency: string, quoteCurrency: string) => ({
        type: CurrencyExchange.ADD_USER_RATE,
        payload: {
            baseCurrency,
            quoteCurrency,
        },
    }),
};

const notifier = {
    showNotification: (text: string) => ({
        type: Notifier.SHOW_NOTIFICATION,
        payload: {
            text,
        },
    }),
};

export default {
    openExchangeRatesApi,
    currencyExchangeView,
    addUserRateView,
    notifier,
};

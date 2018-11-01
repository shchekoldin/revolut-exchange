import {combineReducers} from 'redux';
import {
    CurrencyExchange,
    LatestRates,
    UserAccount,
    Notifier,
} from 'revolut/lib/constants';

const INITIAL_USER_ACCOUNT = {
    balance: {
        EUR: 100,
        GBP: 100,
        USD: 100,
    },
};

const userAccountReducer = (state = INITIAL_USER_ACCOUNT, action) => {
    switch (action.type) {
        case UserAccount.UPDATE_BALANCE:
            return {
                ...state,
                balance: {
                    ...state.balance,
                    ...action.payload.balance,
                },
            };

        default:
            return state;
    }
};

const INITIAL_OPEN_EXCHANGE_RATES_API = {
    rates: {
        EUR: {},
        GBP: {},
        USD: {},
    },
};

export const openExchangeRatesApiReducer = (state = INITIAL_OPEN_EXCHANGE_RATES_API, action) => {
    switch (action.type) {
        case LatestRates.FETCH_LOADED:
            return {
                ...state,
                rates: {
                    ...state.rates,
                    [action.payload.baseCurrency]: action.payload.rates,
                },
            };

        default:
            return state;
    }
};

const INITIAL_CURRENCY_EXCHANGE_VIEW = {
    baseCurrency: 'USD',
    quoteCurrency: 'EUR',
    currencies: ['USD', 'EUR', 'GBP'],
    baseAmount: null,
};

const currencyExchangeViewReducer = (state = INITIAL_CURRENCY_EXCHANGE_VIEW, action) => {
    switch (action.type) {
        case CurrencyExchange.UPDATE_BASE_AMOUNT:
            return {
                ...state,
                baseAmount: action.payload.value,
            };

        case CurrencyExchange.CHANGE_BASE_CURRENCY:
            return {
                ...state,
                baseCurrency: action.payload.currency,
            };

        case CurrencyExchange.CHANGE_QUOTE_CURRENCY:
            return {
                ...state,
                quoteCurrency: action.payload.currency,
            };

        default:
            return state;
    }
};

const INITIAL_RATES_VIEW = {
    rates: {
        EUR: [],
        GBP: [],
        USD: ['EUR', 'GBP', 'RUB'],
    },
};

const userRatesViewReducer = (state = INITIAL_RATES_VIEW, action) => {
    switch (action.type) {
        case CurrencyExchange.ADD_USER_RATE:
            const {
                baseCurrency,
                quoteCurrency,
            } = action.payload;

            const {rates} = state;

            rates[baseCurrency] = rates[baseCurrency].concat(quoteCurrency).sort();

            return state;

        default:
            return state;
    }
};

const INITIAL_NOTIFIER = {
    notifications: [],
};

const notifierReducer = (state = INITIAL_NOTIFIER, action) => {
    switch (action.type) {
        case Notifier.SHOW_NOTIFICATION:
            const {text, type} = action.payload;

            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        text,
                        type,
                    },
                ],
            };

        case Notifier.REMOVE_OLD_NOTIFICATION:
            const notifications = state.notifications.slice(1);

            return {
                ...state,
                notifications,
            };

        default:
            return state;
    }
};

export default combineReducers({
    userAccount: userAccountReducer,
    openExchangeRatesApi: openExchangeRatesApiReducer,
    currencyExchangeView: currencyExchangeViewReducer,
    userRatesView: userRatesViewReducer,
    notifier: notifierReducer,
});

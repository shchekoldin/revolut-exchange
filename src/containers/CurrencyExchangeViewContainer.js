// @flow
import {connect} from 'react-redux';
import {CurrencyExchangeView} from 'revolut/components';
import actions from 'revolut/actions';

export default connect(
    (state) => ({
        userAccountBalance: state.userAccount.balance,
        exchangeRates: state.openExchangeRatesApi.rates,
        view: state.currencyExchangeView,
    }),
    {
        exchange(baseCurrency: string, quoteCurrency: string, quoteRate: number, balance: number, baseAmount: number) {
            return actions.currencyExchangeView.exchange(baseCurrency, quoteCurrency, quoteRate, balance, baseAmount);
        },
        updateBaseAmount(value: number) {
            return actions.currencyExchangeView.updateBaseAmount(value);
        },
        changeBaseCurrency(currency: string) {
            return actions.currencyExchangeView.changeBaseCurrency(currency);
        },
        changeQuoteCurrency(currency: string) {
            return actions.currencyExchangeView.changeQuoteCurrency(currency);
        },
    },
)(CurrencyExchangeView);

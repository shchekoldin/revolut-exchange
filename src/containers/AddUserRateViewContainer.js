// @flow
import {connect} from 'react-redux';
import {AddUserRateView} from 'revolut/components';
import actions from 'revolut/actions';

export default connect(
    (state) => ({
        exchangeRates: state.openExchangeRatesApi.rates,
        view: state.addRateView,
    }),
    {
        addRate(baseCurrency: string, quoteCurrency: string) {
            return actions.addUserRateView.addRate(baseCurrency, quoteCurrency);
        },
    },
)(AddUserRateView);

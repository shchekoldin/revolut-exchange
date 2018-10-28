import {connect} from 'react-redux';
import {UserRatesView} from 'revolut/components';

export default connect(
    (state) => ({
        view: state.userRatesView,
        exchangeRates: state.openExchangeRatesApi.rates,
    }),
)(UserRatesView);

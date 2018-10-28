import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Logger from 'js-logger';
import {AppContainer} from 'revolut/containers';
import {store} from 'revolut/lib/store';
import actions from 'revolut/actions';

Logger.useDefaults();
Logger.setLevel(Logger.DEBUG);

// Start polling rates
store.dispatch(actions.openExchangeRatesApi.pollLatestRates());

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <AppContainer/>
        </Router>
    </Provider>,
    document.getElementById('root'),
);

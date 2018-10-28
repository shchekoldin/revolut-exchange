// @flow
import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {
    AddUserRateViewContainer,
    CurrencyExchangeViewContainer,
    NotifierContainer,
    UserRatesViewContainer,
} from 'revolut/containers';
import styles from './App.scss';

type Props = {
    showNotification: (text: string) => void,
};

class App extends React.Component<Props> {
    componentDidMount() {
        const {showNotification} = this.props;

        showNotification('Welcome');
    }

    render() {
        return (
            <div className={styles.App}>
                <Switch>
                    <Route path="/exchange/" exact component={CurrencyExchangeViewContainer}/>
                    <Route path="/exchange/rates/" exact component={UserRatesViewContainer}/>
                    <Route path="/exchange/rates/add/" exact component={AddUserRateViewContainer}/>
                    <Redirect to="/exchange/"/>
                </Switch>

                <NotifierContainer/>
            </div>
        );
    }
}

export default App;

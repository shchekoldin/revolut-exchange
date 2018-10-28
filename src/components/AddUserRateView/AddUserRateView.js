// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames/bind';
import styles from './AddUserRateView.scss';

type Props = {
    exchangeRates: {},
    addRate: (string, string) => void,
};

type State = {
    baseCurrency: ?string,
};

class AddUserRateView extends React.Component<Props, State> {
    state = {
        baseCurrency: null,
    };

    selectCurrency(currency: string) {
        const {baseCurrency} = this.state;
        const {addRate} = this.props;

        if (!baseCurrency) {
            this.setState({
                baseCurrency: currency,
            });
        } else {
            addRate(baseCurrency, currency);
        }
    }

    render() {
        const {
            baseCurrency,
        } = this.state;

        const {
            exchangeRates: rates,
        } = this.props;

        if (!rates) {
            return null;
        }

        const availableRates = !baseCurrency
            ? Object.keys(rates)
            : Object.keys(rates[baseCurrency]);

        return (
            <div className={styles.AddUserRateView}>
                <div className={styles.header}>
                    <Link to="/exchange/rates/">
                        <button
                            className={cx(styles.navButton, styles.left)}
                            type="button"
                        >
                            Cancel
                        </button>
                    </Link>
                    <span className={styles.title}>Select Currency {!baseCurrency ? 1 : 2}</span>
                </div>

                <ul className={styles.currenciesList}>
                    {availableRates.map((currency) => {
                        return (
                            <li
                                key={currency}
                                className={styles.currencyItem}
                                onClick={() => this.selectCurrency(currency)}
                            >
                                {currency}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default AddUserRateView;

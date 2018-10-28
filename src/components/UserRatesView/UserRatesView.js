// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames/bind';
import money from 'revolut/lib/money';
import styles from './UserRatesView.scss';

type Props = {
    exchangeRates: {},
    view: {
        rates: {},
    },
};

class UserRatesView extends React.Component<Props> {
    render() {
        const {
            exchangeRates: rates,
            view,
        } = this.props;

        if (!rates) {
            return null;
        }

        const sortFn = (a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }

            return (a[0] > b[0]) ? 1 : -1;
        };
        const sortedRatesEntries = Object.entries(view.rates).sort(sortFn);
        const getRateItem = (base: string, quote: string) => {
            const rateValue = rates[base][quote];

            return (
                <li
                    key={`${base}${quote}`}
                    className={styles.rateItem}
                >
                    <div className={styles.shadow}/>
                    <span className={styles.baseCurrency}>
                        1&nbsp;{base}
                    </span>
                    <span className={styles.quotedCurrency}>
                        {rateValue ? (
                            <div>
                                <div>{money.formatRate(rateValue)}</div>
                                <div>{quote}</div>
                            </div>
                        ) : null}
                    </span>
                </li>
            );
        };

        return (
            <div className={styles.UserRatesView}>
                <div className={styles.header}>
                    <Link to="/exchange/">
                        <button
                            className={cx(styles.navButton, styles.left)}
                            type="button"
                        >
                            &lt;&nbsp;Back
                        </button>
                    </Link>
                    <span className={styles.title}>Rates</span>
                    <Link to="/exchange/rates/add/">
                        <button
                            className={cx(styles.navButton, styles.right)}
                            type="button"
                            title="Add new rate"
                        >
                            +
                        </button>
                    </Link>
                </div>

                <div className={styles.ratesList}>
                    <ul>
                        {sortedRatesEntries.reduce((acc, [base, quoteList]) => {
                            // $FlowFixMe
                            quoteList.sort().forEach((quote) => acc.push(getRateItem(base, quote)));

                            return acc;
                        }, [])}
                    </ul>
                </div>
            </div>
        );
    }
}

export default UserRatesView;

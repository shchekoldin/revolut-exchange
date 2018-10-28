// @flow
import React from 'react';
import {Link} from 'react-router-dom';
import cx from 'classnames/bind';
import {CurrencyExchangeBase, CurrencyExchangeQuoted} from 'revolut/components';
import i18n from 'revolut/i18n';
import money from 'revolut/lib/money';
import styles from './CurrencyExchangeView.scss';

type Props = {
    userAccountBalance: {},
    exchangeRates: {},
    view: {
        baseCurrency: string,
        quoteCurrency: string,
        baseAmount: ?number,
        currencies: Array<string>,
    },
    exchange: (string, string, number, {}, ?number) => void,
    updateBaseAmount: (number) => void,
    changeBaseCurrency: (string) => void,
    changeQuoteCurrency: (string) => void,
};

class CurrencyExchangeView extends React.Component<Props> {
    render() {
        const {
            userAccountBalance: balance,
            exchangeRates: rates,
            view,
            exchange,
            updateBaseAmount,
            changeBaseCurrency,
            changeQuoteCurrency,
        } = this.props;

        if (!rates) {
            return null;
        }

        const baseRates = rates[view.baseCurrency];
        const quoteRate = baseRates[view.quoteCurrency];
        const baseAmount = view.baseAmount || '';

        if (!baseRates || !quoteRate) {
            return null;
        }

        const getCurrencyIdx = (currency: string, delta: number) => {
            const currencyIdx = view.currencies.indexOf(currency) + delta;

            if ((currencyIdx >= 0) && (currencyIdx < view.currencies.length)) {
                return currencyIdx;
            }

            return null;
        };

        const onChangeBaseCurrency = (delta) => {
            const currencyIdx = getCurrencyIdx(view.baseCurrency, delta);

            if (currencyIdx !== null) {
                changeBaseCurrency(view.currencies[currencyIdx]);
            }
        };

        const onChangeQuoteCurrency = (delta) => {
            const currencyIdx = getCurrencyIdx(view.quoteCurrency, delta);

            if (currencyIdx !== null) {
                changeQuoteCurrency(view.currencies[currencyIdx]);
            }
        };

        const canChangeBaseCurrency = (delta) => getCurrencyIdx(view.baseCurrency, delta) !== null;
        const canChangeQuoteCurrency = (delta) => getCurrencyIdx(view.quoteCurrency, delta) !== null;

        // $FlowFixMe
        logger.debug('Current balance is', balance);

        return (
            <div className={styles.CurrencyExchangeView}>
                <div className={styles.header}>
                    <button
                        className={cx(styles.navButton, styles.left)}
                        type="button"
                        disabled="disabled"
                    >
                        Cancel
                    </button>
                    <Link className={styles.ratesLink} to="/exchange/rates/">
                        <span>{i18n.currency[view.baseCurrency]}1</span>
                        <span> = </span>
                        <span>{i18n.currency[view.quoteCurrency]}{money.formatRate(quoteRate)}</span>
                    </Link>
                    <button
                        className={cx(styles.navButton, styles.right)}
                        type="button"
                        onClick={() => {
                            return exchange(view.baseCurrency, view.quoteCurrency, quoteRate, balance, view.baseAmount);
                        }}
                    >
                        Exchange
                    </button>
                </div>

                <div className={styles.currencyExchangeGroup}>
                    <div
                        className={cx(styles.prevCurrency, {[styles.hidden]: !canChangeBaseCurrency(-1)})}
                        title="Change base currency"
                        onClick={() => onChangeBaseCurrency(-1)}
                    />
                    <div
                        className={cx(styles.nextCurrency, {[styles.hidden]: !canChangeBaseCurrency(1)})}
                        title="Change base currency"
                        onClick={() => onChangeBaseCurrency(1)}
                    />

                    <CurrencyExchangeBase
                        baseCurrency={view.baseCurrency}
                        quoteCurrency={view.quoteCurrency}
                        quoteRate={quoteRate}
                        balance={balance[view.baseCurrency]}
                        baseAmount={baseAmount}
                        onChange={(value: number) => updateBaseAmount(value)}
                    />

                    {/* It is possible to add multiple "CurrencyExchangeBase" components */}
                </div>
                <div className={cx(styles.currencyExchangeGroup, styles.quoted)}>
                    <div className={styles.shadow}/>
                    <div
                        className={cx(styles.prevCurrency, {[styles.hidden]: !canChangeQuoteCurrency(-1)})}
                        title="Change quote currency"
                        onClick={() => onChangeQuoteCurrency(-1)}
                    />
                    <div
                        className={cx(styles.nextCurrency, {[styles.hidden]: !canChangeQuoteCurrency(1)})}
                        title="Change quote currency"
                        onClick={() => onChangeQuoteCurrency(1)}
                    />

                    <CurrencyExchangeQuoted
                        baseCurrency={view.baseCurrency}
                        quoteCurrency={view.quoteCurrency}
                        quoteRate={quoteRate}
                        balance={balance[view.quoteCurrency]}
                        baseAmount={baseAmount}
                    />

                    {/* It is possible to add multiple "CurrencyExchangeQuoted" components */}
                </div>
            </div>
        );
    }
}

export default CurrencyExchangeView;

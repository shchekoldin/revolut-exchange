// @flow
import React from 'react';
import i18n from 'revolut/i18n';
import money from 'revolut/lib/money';
import styles from './CurrencyExchangeQuoted.scss';

type Props = {
    baseCurrency: string,
    quoteCurrency: string,
    quoteRate: number,
    balance: number,
    baseAmount: number,
};

class CurrencyExchangeQuoted extends React.Component<Props> {
    render() {
        const {
            baseCurrency,
            quoteCurrency,
            quoteRate,
            balance,
            baseAmount,
        } = this.props;
        const baseRate = 1 / quoteRate;
        const quoteAmount = baseAmount * quoteRate;

        return (
            <div className={styles.CurrencyExchangeQuoted}>
                <div>
                    <div className={styles.currencyAmount}>
                        <div className={styles.label}>{quoteCurrency}</div>
                        {(quoteAmount > 0) ? (
                            <div className={styles.amount}>+{money.format(quoteAmount, 1)}</div>
                        ) : null}
                    </div>
                    <div className={styles.sub}>
                        <div className={styles.currencyBalance}>
                            <div>You have: {i18n.currency[quoteCurrency]}{money.format(balance)}</div>
                        </div>
                        <div className={styles.rate}>
                            <span>1{i18n.currency[quoteCurrency]}</span>
                            <span>=</span>
                            <span>{i18n.currency[baseCurrency]}{money.format(baseRate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrencyExchangeQuoted;

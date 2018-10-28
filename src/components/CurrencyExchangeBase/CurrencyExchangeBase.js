// @flow
import React from 'react';
import cx from 'classnames/bind';
import money from 'revolut/lib/money';
import i18n from 'revolut/i18n';
import styles from './CurrencyExchangeBase.scss';

type Props = {
    baseCurrency: string,
    balance: number,
    baseAmount: number,
    onChange: (number) => void,
};

class CurrencyExchangeBase extends React.Component<Props> {
    render() {
        const {
            baseCurrency,
            balance,
            baseAmount,
            onChange,
        } = this.props;

        return (
            <div className={styles.CurrencyExchangeBase}>
                <div className={styles.currencyAmount}>
                    <div className={styles.label}>{baseCurrency}</div>
                    <input
                        className={cx(styles.control, styles.amount)}
                        type="text"
                        value={baseAmount}
                        maxLength={4}
                        pattern="[0-9]*"
                        autoFocus
                        onChange={(e) => {
                            const t = e.target;

                            onChange(t.validity.valid ? t.value : baseAmount);
                        }}
                    />
                </div>
                <div className={styles.sub}>
                    <div className={styles.currencyBalance}>
                        You have: {i18n.currency[baseCurrency]}{money.format(balance)}
                    </div>
                </div>
            </div>
        );
    }
}

export default CurrencyExchangeBase;

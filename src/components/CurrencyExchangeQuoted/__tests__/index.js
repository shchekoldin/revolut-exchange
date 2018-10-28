import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import money from 'revolut/lib/money';
import CurrencyExchangeQuoted from '../CurrencyExchangeQuoted';

describe('Component <CurrencyExchangeQuoted /> should render without errors', () => {
    it('render with static props', () => {
        const props = {
            baseCurrency: 'EUR',
            quoteCurrency: 'GBP',
            quoteRate: 0.5,
            balance: 100,
            baseAmount: 50,
        };

        const wrapper = shallow(<CurrencyExchangeQuoted {...props}/>);

        chai.expect(wrapper.instance()).to.be.not.undefined();
        chai.expect(wrapper.find('.currencyAmount').find('.label').text()).to.equal(props.quoteCurrency);
        chai.expect(wrapper.find('.currencyAmount').find('.amount').text()).to.equal(
            `+${money.format(props.baseAmount * props.quoteRate, 1)}`,
        );

        expect(wrapper).toMatchSnapshot();
    });
});

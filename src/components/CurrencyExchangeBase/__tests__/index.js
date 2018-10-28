import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import CurrencyExchangeBase from '../CurrencyExchangeBase';

describe('Component <CurrencyExchangeBase /> should render without errors', () => {
    it('render with static props', () => {
        const noop = () => {
        };
        const props = {
            baseCurrency: 'EUR',
            balance: 100,
            baseAmount: 50,
            onChange: noop,
        };
        const wrapper = shallow(<CurrencyExchangeBase {...props} />);

        chai.expect(wrapper.instance()).to.be.not.undefined();
        chai.expect(wrapper.find('.currencyAmount').find('.label').text()).to.equal(props.baseCurrency);
        chai.expect(wrapper.find('.currencyAmount').find('.control.amount').prop('value')).to.equal(props.baseAmount);

        expect(wrapper).toMatchSnapshot();
    });
});

import chai from 'chai';
import money from '../index';

describe('Format functions should work as expected', () => {
    it('"format" should with different precision and values', () => {
        chai.expect(money.format(127.127)).to.be.equal('127.13');
    });
});

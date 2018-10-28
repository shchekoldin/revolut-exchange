import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import dirtyChai from 'dirty-chai';

Enzyme.configure({
    adapter: new Adapter(),
});

chai.use(dirtyChai);

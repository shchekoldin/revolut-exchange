import {connect} from 'react-redux';
import {Notifier} from 'revolut/components';

export default connect(
    (state) => ({
        notifications: state.notifier.notifications,
    }),
)(Notifier);

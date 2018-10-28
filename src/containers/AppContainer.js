// @flow
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import App from 'revolut/components/App/App';
import actions from 'revolut/actions';

export default withRouter(connect(
    null,
    {
        showNotification(text: string) {
            return actions.notifier.showNotification(text);
        },
    },
)(App));

// @flow
import React from 'react';
import cx from 'classnames/bind';
import styles from './Notifier.scss';

type Props = {
    notifications: Array<{text: string, type: string}>,
};

class Notifier extends React.Component<Props> {
    render() {
        const {notifications} = this.props;
        const notification = notifications.pop();

        if (!notification) {
            return null;
        }

        const cssType = notification.type.split('.').pop().toLowerCase();

        return (
            <div className={cx(styles.Notifier, styles[cssType])}>
                {notification.text}
            </div>
        );
    }
}

export default Notifier;

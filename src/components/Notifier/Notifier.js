// @flow
import React from 'react';
import cx from 'classnames/bind';
import styles from './Notifier.scss';

type Props = {
    notifications: Array<string>,
};

class Notifier extends React.Component<Props> {
    render() {
        const {notifications} = this.props;
        const hidden = (notifications.length === 0);

        return (
            <div className={cx(styles.Notifier, {[styles.hidden]: hidden})}>
                {notifications.pop()}
            </div>
        );
    }
}

export default Notifier;

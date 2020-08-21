import React from 'react';

import styles from './Toast.module.scss';
import classNames from 'classnames';

function Toast({ children, color = 'primary', ...otherProps }) {
  const classes = classNames(styles['toast'], styles[color]);

  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  );
}

export default Toast;

import React from 'react';
import Typography from '../Typography/Typography';

import styles from './Toast.module.scss';
import classNames from 'classnames';

function Toast({ message, color = 'primary', ...otherProps }) {
  const classes = classNames(styles['toast'], styles[color]);

  return (
    <div className={classes} {...otherProps}>
      <Typography>{message}</Typography>
    </div>
  );
}

export default Toast;

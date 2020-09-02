import React from 'react';
import classNames from 'classnames';

import styles from './Typography.module.scss';
function Typography(props) {
  const {
    title,
    inline,
    small,
    bold,
    children,
    variant,
    className = '',
    ...otherProps
  } = props;
  const classes2 =
    classNames(styles.typography, styles.title, styles[variant]) +
    ' ' +
    className;
  const classes =
    classNames(styles.typography, styles[variant], {
      [styles.bold]: bold,
    }) +
    ' ' +
    className;
  if (title) {
    return (
      <h4 className={classes2} {...otherProps}>
        {children}
      </h4>
    );
  }
  if (inline) {
    return (
      <span className={classes} {...otherProps}>
        {children}
      </span>
    );
  }
  if (small) {
    return (
      <small className={classes} {...otherProps}>
        {children}
      </small>
    );
  }
  return (
    <p className={classes} {...otherProps}>
      {children}
    </p>
  );
}

export default Typography;

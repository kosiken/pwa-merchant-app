import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Button.module.scss';
import classNames from 'classnames';
const Button = ({
  children,
  full,
  onClick,
  color = 'primary',
  loading,
  className,
  ...otherProps
}) => {
  const classes =
    classNames(styles['f-btn'], styles[color], {
      [styles['full']]: full,
    }) +
    ' ' +
    className;

  if (loading) {
    return (
      <button disabled className={classes} {...otherProps}>
        <CircularProgress />
      </button>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

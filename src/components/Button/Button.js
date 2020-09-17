import React from 'react';
import Typography from '../Typography/Typography';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './Button.module.scss';
import classNames from 'classnames';
const Button = ({
  children,
  full,
  onClick,
  color = 'primary',
  loading,
  className = '',
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
        <BeatLoader color="#ffffff" />
      </button>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      <Typography inline>{children}</Typography>
    </button>
  );
};

export default Button;

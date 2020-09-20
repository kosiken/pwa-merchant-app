import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../Typography/Typography';
import BeatLoader from 'react-spinners/BeatLoader';
import styles from './Button.module.scss';
import classNames from 'classnames';
const Button = ({
  children,
  full,
  link,
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
  if (link) {
    return (
      <Link to="#" className={classes} onClick={onClick} {...otherProps}>
        <Typography inline>{children}</Typography>
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...otherProps}>
      <Typography inline>{children}</Typography>
    </button>
  );
};

export default Button;

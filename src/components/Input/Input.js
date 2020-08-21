import React, { forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';


const Input = forwardRef((props, ref) => {
  const { error, name, label, multiline, type, ...otherProps } = props;
  const classes = classNames(styles['input-div'], {
    [styles.error]: !!error,
  });

  if (multiline) {
    return (
      <div className={classes}>
        <textarea
          name={name}
          id={name}
          placeholder={label}
          className={classNames(styles['f-input'], styles['multiline'])}
          ref={ref}
          {...otherProps}
        />

        {!!error && <p className={styles['error-message']}>{error.message}</p>}
      </div>
    );
  }

  return (
    <div className={classes}>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={label}
        className={styles['f-input']}
        ref={ref}
        {...otherProps}
      />

      {!!error && <p className={styles['error-message']}>{error.message}</p>}
    </div>
  );
});
export default Input;

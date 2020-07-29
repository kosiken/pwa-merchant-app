import React, {  useCallback, useState, forwardRef } from 'react';
import classNames from 'classnames';

import styles from './Checkbox.module.scss';


const Checkbox = forwardRef((props, ref) => {
  const {
    label,
    disabled,
    onChange,
    name,
    className,
    checked,
    ...otherProps
  } = props;
  const [isChecked, setChecked] = useState(!!checked);

  const toggle = useCallback(
    () => {
      if (disabled) return;
      const newValue = !isChecked;
      setChecked(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [isChecked, onChange],
  );


  const spanUnCheckedClasses = classNames(
    styles['checkbox-span'],
    styles['checkbox-icon-unchecked'],
  );
  const spanCheckedClasses = classNames(
    styles['checkbox-span'],
    styles['checkbox-icon-checked'],
  );
  const iconClass = classNames(styles['checkbox-icon']);
  const unCheckedSpan = (
    <span className={spanUnCheckedClasses}>
      <svg
        className={iconClass}
        focusable='false'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z' />
      </svg>
    </span>
  );

  const checkedSpan = (
    <span className={spanCheckedClasses}>
      <svg
        className={iconClass}
        focusable='false'
        viewBox='0 0 24 24'
        aria-hidden='true'
      >
        <path d={`M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11
         0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`}
        />
      </svg>
    </span>
  );

  const labelClass = classNames(styles['checkbox-label']);
  const checkboxLabel = <span className={labelClass}>{label}</span>;
  const classes = classNames(styles.checkbox, className, {
    [styles.active]: isChecked,
    [styles.disabled]: disabled,
  });
  return (
    <label htmlFor={name || 'checkbox'} className={classes}>
      <input
        type='checkbox'
        name={name || 'checkbox'}
        id={name || 'checkbox'}
        onChange={toggle}
        checked={isChecked}
        ref={ref}
        {...otherProps}
      />
      {checkedSpan}
      {unCheckedSpan}
      {checkboxLabel}
    </label>
  );
});
export default Checkbox;

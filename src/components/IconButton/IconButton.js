import React from 'react';
import classNames from 'classnames';
import styles from './IconButton.module.scss';

function IconButton({children,onClick, active, disabled, variant, ...otherProps}) {
	const clicked = () => {
	if(!disabled && onClick) onClick()
	
	}
  const classes = classNames(styles.IconButton, styles[variant], {
        [styles.active]: active,
        [styles.disabled]: disabled
       
    })
    
    return (
       <span className={classes} onClick={clicked} {...otherProps} >
           {children}
       </span>
    )
}

export default IconButton



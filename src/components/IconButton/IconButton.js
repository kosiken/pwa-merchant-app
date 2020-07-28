import React from 'react';
import classNames from 'classnames';
import styles from './IconButton.module.scss';
function IconButton({children,onClick, active , ...otherProps}) {

  const classes = classNames(styles.IconButton, {
        [styles.active]: active
    })
    
    //console.log(styles)
    return (
       <span className={classes} onClick={onClick} {...otherProps} >
           {children}
       </span>
    )
}

export default IconButton
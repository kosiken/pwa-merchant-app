import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
const Button = ({ children, full, onClick, color = 'primary', ...otherProps }) => {
    console.log(color)

    const classes = classNames(styles['f-btn'], styles[color], {
        [styles['full']]: full
    });

    return (<button className={classes} onClick={onClick} {...otherProps}>{children}</button>)

}

export default Button

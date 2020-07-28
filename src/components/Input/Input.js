import React, {forwardRef} from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'
const Input = forwardRef((props, ref) => {
const {error, name, type, ...otherProps } = props
    const classes = classNames(styles['input-div'], {
        [styles.error]: !!error
    })
    return (
        <div className={classes}>
            
            <input type={type} name={name} id={name} placeholder={name} className={styles["f-input"]} ref={ref} {...otherProps} />

            {!!error && (<p className={styles["error-message"]}>{error.message}</p>)}
        </div>
    )
}
)
export default Input

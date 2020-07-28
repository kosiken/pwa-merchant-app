import React from 'react'
import classNames from 'classnames';



import styles from './Typography.module.scss';
function Typography(props) {

   const {title,  inline, small, children,variant,  ...otherProps} = props;

   const classes = classNames(styles.typography, styles[variant] );
   if(title) {
return (
    <h1 className={classes} {...otherProps}>
        {children}
    </h1>
)
   }
   if(inline) {
       return (
           <span className={classes} {...otherProps}>
           {children}
           </span>
       )
   }
   if (small) {
       return (
           <small className={classes} {...otherProps}>
           {children}

           </small>
       )
   }
    return (
     <p className={classes} {...otherProps}>
     {children}

     </p>
    )
}

export default Typography

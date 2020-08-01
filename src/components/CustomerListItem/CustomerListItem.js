import React from 'react';
import Typography from '../Typography/Typography'


import { FiUser as UserIcon } from 'react-icons/fi'
import styles from './CustomerListItem.module.scss';




const CustomerListItem = ({ customer }) => {
    return (
        <div className={[styles['customer-list-item']]}>
            <div className={styles['header']}>
                <span>
                    <UserIcon />
                </span>
                <section className={styles['customer-info']}>
                    <Typography style={{
                    
                    fontWeight: '600'
                    }}>{customer.name} - {customer.phone}</Typography>
                </section>
            </div>
           <div className={styles['customer-info']}>
           
           <p>
           
           Before we do that, there are a couple of functions that we need in order to create
           the customizable SVG arc. I found these on StackOverflow.
            </p>
        </div>
         </div>
    )
}

export default CustomerListItem

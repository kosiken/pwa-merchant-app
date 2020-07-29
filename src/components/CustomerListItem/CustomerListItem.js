import React from 'react';
import Typography from '../Typography/Typography'
import IconButton from '../IconButton/IconButton'

import { FiUser as UserIcon, FiX as CloseIcon } from 'react-icons/fi'
import styles from './CustomerListItem.module.scss';




const CustomerListItem = ({ customer }) => {
    return (
        <div className={[styles['customer-list-item']]}>
            <div className={styles['header']}>
                <span>
                    <UserIcon />
                </span>
                <section className={styles['']}>
                    <Typography>{customer.name}</Typography>
                </section>
            </div>
            <IconButton active>
                <CloseIcon />
            </IconButton>
        </div>
    )
}

export default CustomerListItem

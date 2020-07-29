import React from 'react';
import Typography from '../Typography/Typography'
import IconButton from '../IconButton/IconButton'

import { FiUser as UserIcon, FiX as CloseIcon } from 'react-icons/fi'
import styles from './CustomerListItem.module.scss';




const CustomerListItem = ({ customer }) => {
    return (
        <div className={[styles['customer-list-item']]}>
            <span>
                <UserIcon />
            </span>

            <Typography>{customer.name}</Typography>
            <IconButton active>
                <CloseIcon />
            </IconButton>
        </div>
    )
}

export default CustomerListItem

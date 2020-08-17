import React from 'react';
import Typography from '../Typography/Typography';
import Avatar from '@material-ui/core/Avatar';
import { FiUser as UserIcon } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import styles from './CustomerListItem.module.scss';

const CustomerListItem = ({ customer }) => {
  return (
    <Link to={'/customers/' + customer.id}>
      <div className={[styles['customer-list-item']]}>
        <div className={styles['header']}>
          <Avatar>
            <UserIcon />
          </Avatar>
          <section className={styles['customer-info']}>
            <Typography
              style={{
                fontWeight: '600',
                margin: '0 0 8px',
              }}
            >
              {customer.full_name}
            </Typography>

            <Typography small>{customer.phone_number}</Typography>
          </section>
        </div>
      </div>
    </Link>
  );
};

export default CustomerListItem;

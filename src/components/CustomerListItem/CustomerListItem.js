import React from 'react';
import Typography from '../Typography/Typography';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Avatar from '@material-ui/core/Avatar';
import { FiUser as UserIcon, FiEdit as EditIcon } from 'react-icons/fi';

import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri';
import styles from './CustomerListItem.module.scss';
import Dialog from '@material-ui/core/Dialog';

const CustomerListItem = ({ customer, onEdit }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
        <IconButton
          style={{
            position: 'absolute',
            right: '40px',
          }}
          onClick={() => onEdit(customer)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          style={{
            position: 'absolute',
            right: '10px',
            color: '#f0324b',
          }}
          onClick={handleClickOpen}
        >
          <DeleteIcon />
        </IconButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div>
          <Typography
            style={{
              fontWeight: '600',
              margin: '0 0 8px',
              padding: '16px 24px',
            }}
            title
          >
            {`Delete ${customer.full_name}?`}
          </Typography>

          <Typography
            style={{
              padding: '8px 24px',
            }}
          >
            {' '}
            Are you sure you want to delete this customer
          </Typography>

          <Button
            color="clear"
            full
            style={{
              textAlign: 'right',
              padding: '10px',
            }}
          >
            Confirm{' '}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CustomerListItem;

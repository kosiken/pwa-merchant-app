import React from 'react';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';

import { FiEdit as EditIcon } from 'react-icons/fi';
import Dialog from '@material-ui/core/Dialog';
import { RiDeleteBin6Line as DeleteIcon } from 'react-icons/ri';
import styles from './FoodListItem.module.scss';
import meat from '../../assets/meat.png';
import bread from '../../assets/bread.png';
import hamburger from '../../assets/hamburger.png';

const FoodListItem = ({ food_item, onEdit, index }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = classNames({
    [styles.available]: food_item.is_available,
    [styles.unavailable]: !food_item.is_available,
  });
  return (
    <div className={[styles['food-list-item']]}>
      <img src={[meat, hamburger, bread][index % 3]} alt={food_item.name} />

      <div className={styles['header']}>
        <Divider />
        <Typography>{food_item.name}</Typography>
        <Typography inline variant="gray">
          {food_item.price}
        </Typography>
      </div>
      <section style={{ position: 'relative' }}>
        <span className={classes}>
          {food_item.is_available ? 'Available' : 'Unavailable'}{' '}
        </span>
        <IconButton
          style={{
            position: 'absolute',
            right: '40px',
          }}
          onClick={() => onEdit(food_item)}
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
      </section>
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
            {`Delete ${food_item.name}?`}
          </Typography>

          <Typography
            style={{
              padding: '8px 24px',
            }}
          >
            {' '}
            Are you sure you want to delete this food item
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

export default FoodListItem;

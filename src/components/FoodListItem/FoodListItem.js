import React from 'react';
import Typography from '../Typography/Typography';

import styles from './FoodListItem.module.scss';

const FoodListItem = ({ food_item }) => {
  return (
    <div className={[styles['customer-list-item']]}>
      <div className={styles['header']}>
        <Typography
          style={{
            fontWeight: '600',
          }}
        >
          {food_item.name}
        </Typography>
        <Typography
          style={{
            fontWeight: '300',
          }}
        >
          NGN{food_item.price}
        </Typography>
      </div>
      <div className={styles['customer-info']}>
        <span
          style={{
            color: 'black',
            padding: '2px 6px',
            borderRadius: '5px',
            fontSize: '13px',
            backgroundColor: food_item.is_available ? '#2ebd66' : '#f0324b',
          }}
        >
          {food_item.is_available ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </div>
  );
};

export default FoodListItem;

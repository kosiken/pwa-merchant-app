import React from 'react';

import Typography from '../Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../Input/Input';

import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';
import useSearch from '../../hooks/useSearch';

function Foodselect({ Foods, theRef, onChange, loading }) {
  const addNewFood = () => {
    let price;
    price = parseFloat(prompt('Enter price for ' + theRef.current.value));
    while (isNaN(price) || price < 1) {
      price = prompt('Enter a valid price for ' + theRef.current.value);
      if (!price.length) break;
      price = parseFloat(price);
    }
    if (!price) return;
    onChange({
      target: {
        value: {
          name: theRef.current.value,
          price,
          is_available: true,
          is_new: true,
        },
      },
    });
  };
  if (loading) {
    return (
      <div className={styles['location-list']}>
        <div focusable>
          <CircularProgress color="#f0324b" />
        </div>
      </div>
    );
  }
  if (Foods.length) {
    return (
      <div className={styles['location-list']}>
        {!!theRef.current.value && (
          <div focusable className={styles['location-list-item'] + ' mb-1'}>
            {' '}
            <Typography inline>{theRef.current.value}</Typography>
            <Typography inline onClick={addNewFood} variant="primary">
              New
            </Typography>
          </div>
        )}
        {Foods.map((l, i) => (
          <div
            focusable
            className={styles['location-list-item'] + ' mb-1'}
            key={'food-item' + i}
            onClick={() => {
              theRef.current.value = l.name;
              onChange({
                target: {
                  value: l,
                },
              });
            }}
          >
            {' '}
            <Typography inline> {l.name} </Typography>{' '}
            <span className={styles['location-list-item-span']}>
              {' '}
              N{l.price}{' '}
            </span>
          </div>
        ))}
      </div>
    );
  } else
    return (
      <div className={styles['location-list']}>
        <div focusable className={styles['location-list-item'] + ' mb-1'}>
          {' '}
          <Typography inline>{theRef.current.value}</Typography>
          <Typography inline onClick={addNewFood} variant="primary">
            New
          </Typography>
        </div>
      </div>
    );
}

function ComboBox({ items, onChange, loading }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);

  let Foods = useSearch(ref, items, (currentValue, food) =>
    new RegExp(currentValue.toLowerCase()).test(food.name.toLowerCase())
  );

  return (
    <div className="add-div">
      <Input type="search" name="food" label="Food*" ref={ref} />
      {show && (
        <Foodselect
          Foods={Foods}
          onChange={onChange}
          loading={loading}
          theRef={ref}
        />
      )}{' '}
    </div>
  );
}

export default ComboBox;

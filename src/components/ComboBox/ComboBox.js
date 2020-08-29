import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../Input/Input';

//import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';
import useSearch from '../../hooks/useSearch';

function Foodselect({ Foods, theRef, onChange, loading }) {
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
        {Foods.map((l) => (
          <div
            focusable
            className={styles['location-list-item'] + ' mb-1'}
            key={uuid()}
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
        <div focusable>
          {' '}
          <Typography inline>
            {theRef.current.value} No items found{' '}
          </Typography>{' '}
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
      <Input type="search" name="food" label="Food" ref={ref} />
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

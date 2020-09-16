import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '../Input/Input';

import useSearch from '../../hooks/useSearch';
import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';

function CustomerSelect({ items, onChange, theRef, loading }) {
  if (loading) {
    return (
      <div className={styles['location-list']}>
        <div focusable>
          <CircularProgress color="#f0324b" />
        </div>
      </div>
    );
  }
  if (items.length) {
    return (
      <div className={styles['location-list']}>
        {items.map((l) => (
          <div
            focusable
            className={styles['location-list-item']}
            key={uuid()}
            onClick={() => {
              theRef.current.value = l.full_name;
              onChange(l);
            }}
          >
            {' '}
            <Typography inline> {l.full_name} </Typography>
            <Typography className="ml-2" small variant="gray">
              {' '}
              {l.phone_number}{' '}
            </Typography>
          </div>
        ))}
      </div>
    );
  } else return false;
}

function ComboBox({ items, onChange, loading }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);

  let customers = useSearch(ref, items, (currentValue, customer) => {
    let regexp = new RegExp(currentValue.toLowerCase());
    return (
      regexp.test(customer.full_name.toLowerCase()) ||
      regexp.test(customer.phone_number)
    );
  });

  return (
    <div className="add-div">
      <Input
        type="search"
        name="customer"
        label="Customer name or phone number"
        ref={ref}
      />
      {show && (
        <CustomerSelect
          items={customers}
          onChange={onChange}
          loading={loading}
          theRef={ref}
        />
      )}
    </div>
  );
}

export default ComboBox;

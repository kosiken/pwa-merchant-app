import React from 'react';
import classNames from 'classnames';
import Typography from '../Typography/Typography';
import Input from '../Input/Input';
import BeatLoader from 'react-spinners/BeatLoader';
import useSearch from '../../hooks/useSearch';
import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';

function CustomerSelect({ items, onChange, theRef, loading }) {
  if (loading) {
    return (
      <div className={styles['location-list']}>
        <div focusable>
          <BeatLoader color="#011627" />
        </div>
      </div>
    );
  }
  if (items.length) {
    return (
      <div className={styles['location-list']}>
        {items.map((l, i) => {
          if (l.Addresses) {
            if (!l.Addresses[0]) {
              l.Addresses = [
                {
                  full_address: 'No Address',
                },
              ];

              l.disabled = true;
            } else if (!l.Addresses[0].full_address) {
              l.Addresses = [
                {
                  full_address: 'No Address',
                },
              ];

              l.disabled = true;
            }
          } else {
            l.Addresses = [
              {
                full_address: 'No Address',
              },
            ];

            l.disabled = true;
          }
          const classes = classNames(styles['location-list-item'], {
            [styles.disabled]: l.disabled,
          });
          return (
            <div
              focusable
              className={classes}
              key={'customer-l' + i}
              onClick={() => {
                if (l.disabled) {
                  alert('No address found for customer');
                  return;
                }

                theRef.current.value = l.full_name;
                onChange(l);
              }}
            >
              <div className="add-div">
                <Typography inline> {l.full_name} </Typography>
                <Typography className="ml-2" small variant="gray">
                  {' '}
                  {l.phone_number || 'No phone'}{' '}
                </Typography>
              </div>{' '}
              <Typography style={{ fontSize: '12px' }}>
                {l.Addresses ? l.Addresses[0].full_address : 'No Address'}{' '}
              </Typography>{' '}
            </div>
          );
        })}
      </div>
    );
  } else return false;
}

function ComboBox0({ items, onChange, loading }) {
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

export default ComboBox0;

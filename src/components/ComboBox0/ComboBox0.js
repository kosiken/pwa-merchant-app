import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';

import Input from '../Input/Input';

//import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './ComboBox.module.scss';
import useFocus from '../../hooks/useFocus';

function useCustomers(ref, customerArray) {
  //console.log(foodsArray);
  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
    //  console.log(foodsArray.length);
    setCustomers(customerArray);
    const node = ref.current;
    if (node) {
      node.addEventListener('input', changeCustomers);
      // node.addEventListener('blur', handleBlur);

      return () => {
        node.removeEventListener('input', changeCustomers);
        //node.removeEventListener('blur', handleBlur);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, customerArray]);
  const changeCustomers = React.useCallback(
    (e) => {
      setCustomers(
        customerArray.filter((l) => {
          return new RegExp(e.target.value.toLowerCase()).test(
            l.full_name.toLowerCase()
          );
        })
      );
    },
    [customerArray]
  );

  return customers;
}

function CustomerSelect({ items, onChange, theRef }) {
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
            <Typography inline> {l.full_name} </Typography>{' '}
          </div>
        ))}
      </div>
    );
  } else return false;
}

function ComboBox({ items, onChange }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);

  let customers = useCustomers(ref, items);

  return (
    <div className="add-div">
      <Input
        type="search"
        name="customer"
        label="Customer name"
  
        ref={ref}
      />
      {show && (
        <CustomerSelect items={customers} onChange={onChange} theRef={ref} />
      )}
    </div>
  );
}

export default ComboBox;

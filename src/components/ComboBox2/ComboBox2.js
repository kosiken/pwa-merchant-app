import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';
//import TextField from "@material-ui/core/TextField";
import { MdSearch as SearchIcon } from 'react-icons/md';
//import Autocomplete from "@material-ui/lab/Autocomplete";
import styles from './ComboBox2.module.scss';
import useFocus from '../../hooks/useFocus';

function Locationselect({ Locations, theRef, onChange }) {
  if (Locations.length) {
    return (
      <div className={styles['location-list']}>
        {Locations.map((l) => (
          <div
            focusable
            className={styles['location-list-item']}
            key={uuid()}
            onClick={() => {
              theRef.current.value = l.full_address;
              onChange({
                target: {
                  value: l.id,
                },
              });
            }}
          >
            {' '}
            <Typography inline> {l.full_address} </Typography>{' '}
          </div>
        ))}
        <div style={{ margin: '10px 0' }}>
          {' '}
          <Button color="secondary">New Address </Button>
        </div>
      </div>
    );
  } else
    return (
      <div className={styles['location-list']}>
        <div focusable>
          {' '}
          <Typography inline>{theRef.current.value} not found </Typography>{' '}
          <Link to="/create_food">
            {' '}
            <Button color="secondary">Create </Button>
          </Link>
        </div>
      </div>
    );
}

function ComboBox2({ items, onChange }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);

  let [Locations, setLocations] = React.useState(items);
  React.useEffect(() => {
    //  console.log(foodsArray.length);
    setLocations(items);
  }, [items]);

  return (
    <div className="locations-div">
      <Input
        type="text"
        name="location"
        label="Location"
        style={{ margin: '0 auto' }}
        ref={ref}
      />
      {show && (
        <Locationselect
          Locations={Locations}
          onChange={onChange}
          theRef={ref}
        />
      )}{' '}
    </div>
  );
}

export default ComboBox2;

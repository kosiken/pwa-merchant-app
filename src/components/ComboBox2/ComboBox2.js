import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import Button from '../Button/Button';

import api from '../../api';

import styles from './ComboBox2.module.scss';
import useFocus from '../../hooks/useFocus';

function useLocations(ref) {
  const [locations] = React.useState([]);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('input', changeLocations);

      return () => {
        node.removeEventListener('input', changeLocations);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  const changeLocations = async (e) => {
    try {
      let results = await api.searchPlaces(e.target.value);
      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  return locations;
}

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
                  value: l,
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

function ComboBox2({ onChange }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  let show = useFocus(ref);
  let Locations = useLocations(ref);

  return (
    <div className="locations-div">
      <Input type="text" name="location" label="Location" ref={ref} />
      {show && (
        <Locationselect
          Locations={Locations}
          onChange={onChange}
          theRef={ref}
        />
      )}{' '}
      <div id="map"></div>
    </div>
  );
}

export default ComboBox2;

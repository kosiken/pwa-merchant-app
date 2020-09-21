import React from 'react';

import Typography from '../Typography/Typography';
import { Image } from 'react-bootstrap';
import Input from '../Input/Input';

import BeatLoader from 'react-spinners/BeatLoader';
import Paper from '@material-ui/core/Paper';
import styles from './ComboBox2.module.scss';
import useFocus from '../../hooks/useFocus';
import useDebounce from '../../hooks/useDebounce';
import useLocations from '../../hooks/useLocations';
import googleLogo from '../../assets/google.png';

function Locationselect({
  Locations,
  theRef,
  onChange,
  isSearching,
  hasError,
}) {
  const defaultLocation = () => {
    onChange({
      target: {
        value: {
          full_address: theRef.current.value,
          google_map_link: '',
          latitude: 6.465422,
          longitude: 3.406448,
          is_default: true,
        },
      },
    });
  };
  if (hasError) {
    return (
      <div className={styles['location-list']}>
        <div
          focusable
          className={styles['location-list-item']}
          onClick={defaultLocation}
        >
          <Typography> Continue with -> {theRef.current.value}</Typography>
        </div>
        <div focusable className={styles['location-list-item']}>
          <Typography
            style={{
              color: '#f0324b',
            }}
          >
            {' '}
            Unable to load Places API
          </Typography>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className={styles['location-list']}>
        <div className="pl-3 pr-3 mb-3">
          <Image src={googleLogo} />
        </div>
        <div
          focusable
          className={styles['location-list-item']}
          onClick={defaultLocation}
        >
          <Typography> Continue with -> {theRef.current.value}</Typography>
        </div>
        <div className={styles['location-list-item']}>
          <BeatLoader color="#f0324b" />
          <Typography inline> Finding matches</Typography>
        </div>
      </div>
    );
  }
  if (Locations.length) {
    return (
      <div className={styles['location-list']}>
        <div className="pl-3 pr-3 mb-3">
          <Image src={googleLogo} />
        </div>
        {Locations.map((l, i) => (
          <div
            focusable
            className={styles['location-list-item']}
            key={'address' + i}
            onClick={() => {
              theRef.current.value = l.description;
              onChange({
                target: {
                  value: l,
                },
              });
            }}
          >
            {' '}
            <Typography inline> {l.description} </Typography>{' '}
          </div>
        ))}
      </div>
    );
  } else
    return (
      <div className={styles['location-list']}>
        <div
          focusable
          className={styles['location-list-item']}
          onClick={defaultLocation}
        >
          {theRef.current ? 'Continue with -> ' + theRef.current.value : ''}
        </div>
        <div className={styles['location-list-item']}>
          <Typography>No results found</Typography>
        </div>
      </div>
    );
}

function ComboBox2({ onChange, ...otherProps }) {
  const ref = React.useRef(null);
  //const ref = React.useRef(null)

  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  let show = useFocus(ref);
  let { locations, isSearching, hasError } = useLocations(debouncedSearchTerm);

  return (
    <div className="locations-div add-div">
      <Input
        type="text"
        name="location"
        autocomplete="disabled"
        multiline
        ref={ref}
        {...otherProps}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {show && (
        <Paper>
          <Locationselect
            Locations={locations}
            isSearching={isSearching}
            onChange={onChange}
            theRef={ref}
            hasError={hasError}
          />
        </Paper>
      )}{' '}
    </div>
  );
}

export default ComboBox2;

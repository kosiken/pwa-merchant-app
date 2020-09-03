import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';

import Input from '../Input/Input';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ComboBox2.module.scss';
import useFocus from '../../hooks/useFocus';
import useDebounce from '../../hooks/useDebounce';
function useLocations(value) {
  const [locations, setLocations] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  React.useEffect(() => {
    if (value) {
      setIsSearching(true);
      try {
       
        if (!window.FiveService) {
        setIsSearching(false);
        setHasError(true)
        return};
setHasError(false)
        let request = {
          query: value,
          fields: ['name', 'formatted_address', 'geometry', 'plus_code', 'url'],
          region: '.ng',
          locationBias: {
            radius: 100,
            center: { lat: 6.465422, lng: 3.406448 },
          },
        };

        window.FiveService.textSearch(request, function (results, status) {
          if (status === 'ZERO_RESULTS') setLocations([]);
          if (status === 'OK') {
            if (results instanceof Array)
              setLocations(
                results.map((result) => {
                  return {
                    latitude: result.geometry.location.lat(),
                    longitude: result.geometry.location.lng(),
                    full_address: `${result.name} ${result.formatted_address}`,
                    plus_code:
                      result.plus_code && result.plus_code.compound_code,
                    google_map_link: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${result.place_id}`,
                  };
                })
              );
          }
          setIsSearching(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [value]);

  return { locations, isSearching, hasError };
}

function Locationselect({ Locations, theRef, onChange, isSearching, hasError }) {
  if (hasError) {
    return (
      <div className={styles['location-list']}>
        <div focusable>
       <Typography style={{
       color:"#f0324b"
       }}> Unable to load Places API</Typography>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className={styles['location-list']}>
        <div focusable>
          <CircularProgress color="#f0324b" />
        </div>
      </div>
    );
  }
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
      </div>
    );
  } else
    return (
      <div className={styles['location-list']}>
        <div focusable>
          {' '}
          <Typography> No results found </Typography>
        </div>
      </div>
    );
}

function ComboBox2({ onChange }) {
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
        label="Customer Address"
        autocomplete="disabled"
        multiline
        ref={ref}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {show && (
        <Locationselect
          Locations={locations}
          isSearching={isSearching}
          onChange={onChange}
          theRef={ref}
          hasError={hasError}
        />
      )}{' '}
    </div>
  );
}

export default ComboBox2;

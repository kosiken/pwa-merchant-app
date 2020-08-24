import React from 'react';
import { v4 as uuid } from 'uuid';
import Typography from '../Typography/Typography';

import Input from '../Input/Input';

import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './ComboBox2.module.scss';
import useFocus from '../../hooks/useFocus';
import useDebounce from '../../hooks/useDebounce';
function useLocations(ref) {
  const [locations, setLocations] = React.useState([]);

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
    setTimeout(() => {
      try {
        if (!window.FiveService) return;
        if (!ref.current.value) return;
        let request = {
          query: ref.current.value,
          fields: ['name', 'formatted_address'],
        };

        window.FiveService.textSearch(request, function (results, status) {
          console.log(status);

          if (results instanceof Array) setLocations(results);
        });
      } catch (err) {
        console.log(err);
      }
    }, 300);
  };
  return locations;
}

function Locationselect({ Locations, theRef, onChange }) {
  let show = useDebounce(theRef.current.value, 3000);
  if (show) {
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
              theRef.current.value = l.formatted_address;
              onChange({
                target: {
                  value: l,
                },
              });
            }}
          >
            {' '}
            <Typography inline> {l.formatted_address} </Typography>{' '}
          </div>
        ))}
        {/* <div style={{ margin: '10px 0' }}>
       
          <Button color="secondary">New Address </Button>
        </div> */}
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

  let show = useFocus(ref);
  let Locations = useLocations(ref);

  return (
    <div className="locations-div">
      <Input type="text" name="location" label="Location" multiline ref={ref} />
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

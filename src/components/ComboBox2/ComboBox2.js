import React from 'react';

import Typography from '../Typography/Typography';
import { Image } from 'react-bootstrap';
import Input from '../Input/Input';
import BeatLoader from 'react-spinners/BeatLoader';
import Paper from '@material-ui/core/Paper';
import Button from '../Button/Button';
import styles from './ComboBox2.module.scss';
import Dialog from '@material-ui/core/Dialog';
import {FiX as CloseIcon} from 'react-icons/fi'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
 import DialogActions from '@material-ui/core/DialogActions';
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
        <div className="pl-3 pr-3 pt-0">
          <Image src={googleLogo} />
        </div>

        <div className={styles['location-list-item']}>
          <Typography inline>
            {' '}
            Finding matches <BeatLoader color="#011627" />
          </Typography>
        </div>
      </div>
    );
  }
  if (Locations.length) {
    return (
      <div className={styles['location-list']}>
        <div className="pl-3 pr-3 pt-0">
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
            <Typography > {l.description} </Typography>{' '}
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
          <Typography> {theRef.current ? 'Continue with -> ' + theRef.current.value: ''}</Typography>
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
  let [show, setShow] = React.useState(false);
  let { locations, isSearching, hasError } = useLocations(debouncedSearchTerm);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="locations-div add-div">
     <Button  color="clear" onClick={handleClickOpen} link>
        Select Address
      </Button>
      <br/><br/>
      <Dialog
        fullScreen={fullScreen}
        open={show}
       style={{
      minWidth:'80vw'
      }}
    
        aria-labelledby="responsive-dialog-title"
      >           <DialogActions>
          <Button onClick={handleClose} color="clear">
            <CloseIcon />
          </Button>
        </DialogActions>
         <DialogContent>  <Paper style={{
      minWidth:'30vw'
     
      }}
       elevation={0}
      >
        <Input
          type="text"
          name="location"
          autocomplete="disabled"
        
          ref={ref}
          style={{margin:'0 auto'}}
          {...otherProps}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Locationselect
          Locations={locations}
          isSearching={isSearching}
          onChange={onChange}
          theRef={ref}
          hasError={hasError}
        />
        </Paper></DialogContent>
               <DialogActions>
          <Button onClick={handleClose} color="clear">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ComboBox2;

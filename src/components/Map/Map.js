import React, { useState, useEffect } from 'react';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';

import LinearProgress from '@material-ui/core/LinearProgress';
import { FiAlertTriangle as DangerIcon } from 'react-icons/fi';
import Paper from '@material-ui/core/Paper';
import io from 'socket.io-client';

const Map = ({ rider, token }) => {
  // eslint-disable-next-line  no-unused-vars
  const [map, setMap] = useState(null);
  let [error, setError] = useState(false);

  let [position, setPosition] = useState(null);
  let [marker, setMarker] = useState(null);
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!window.google) {
      setError(true);
      setLoading(false);
      return;
    }

    if (error) return;

    const socket = io.connect('https://api.500chow.com', {
      query: { token },
    });

    socket.on('connect', function () {
      console.log(marker);
      setLoading(false);
    });
    socket.on('500Driver ' + rider, function (pos) {
      try {
        if (isLoading) setLoading(false);

        setPosition(pos);
        if (marker) marker.setPosition(pos);
        else {
          setError(true);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!position) return;

    console.log(position);
    if (marker) marker.setPosition(position);
    else {
      setError(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  useEffect(() => {
    if (isLoading) return;

    let b = new window.google.maps.LatLng(10.0, 8.0);
    setMarker(
      new window.google.maps.Marker({
        position: b,
        title: rider,
      })
    );
    //  let b =  new window.google.maps.LatLng(10.0000, 8.0000);
    if (!map) {
      const mapOptions = {
        zoom: 9,
        center: b,
      };

      let m = new window.google.maps.Map(
        document.getElementById('f-map'),
        mapOptions
      );
      setMap(m);
      //   console.log(marker.position.lat())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (marker) {
      if (map) marker.setMap(map);
    }
  }, [marker, map]);
  if (error) {
    return (
      <div className="mt-3 mb-3 t-center">
        <Paper className="p-5">
          <Typography
            title
            style={{
              textAlign: 'center',
              fontSize: '4em',
              color: '#f0324b',
            }}
          >
            {' '}
            <DangerIcon />
          </Typography>

          <Typography className="mt-3 t-center" variant="error">
            An error has occurred while tracking
          </Typography>
        </Paper>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="mt-3 mb-3 t-center">
        <Paper className="pb-3">
          <LinearProgress /> <div id="f-map" />
          <br /> <br />
          <Typography className="t-center">Finding location </Typography>
          <Button>Cancel</Button>
        </Paper>
      </div>
    );
  }

  return (
    <div className="mt-3 mb-3 t-center">
      <Paper className="pb-3">
        <div id="f-map" style={{ height: '300px' }} />
      </Paper>
    </div>
  );
};

export default Map;

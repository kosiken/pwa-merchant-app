import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import './Loader.scss';

const Loader = ({ backdrop, open, children }) => {
  return (
    <>
      <CircularProgress color="#f0324b" />
    </>
  );
};

export default Loader;

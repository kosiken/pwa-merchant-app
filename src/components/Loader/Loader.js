import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress color="#f0324b" />
    </div>
  );
};

export default Loader;

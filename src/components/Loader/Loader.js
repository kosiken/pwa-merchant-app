import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import Backdrop from '@material-ui/core/Backdrop';
import './Loader.scss';

const Loader = ({ backdrop, open, children }) => {
  if (backdrop) {
    return (
      <Backdrop
        className={'loader'}
        style={{
          height: '100vh',
          zIndex: '999999',
        }}
        open={open}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <BeatLoader color="#ffffff" />
          {children}
        </div>
      </Backdrop>
    );
  }
  return (
    <div className="loader">
      <BeatLoader color="#f0324b" />
    </div>
  );
};

export default Loader;

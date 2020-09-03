import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import './Loader.scss';

const Loader = ({backdrop, open, children}) => {
if(backdrop){
return (
<Backdrop className={'loader' } style={{
height: '100vh',
  zIndex: '999999'}} open={open}>
  <div style={{
  textAlign: 'center'
  }}>
  <CircularProgress color="inherit" /> 
  {children}
  </div>
  
</Backdrop>

);
}
  return (
    <div className="loader">
      <CircularProgress color="#f0324b" />
    </div>
  );
};

export default Loader;

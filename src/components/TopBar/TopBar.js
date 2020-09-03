import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';
import { FiMenu as MenuIcon } from 'react-icons/fi';
import './TopBar.scss';

const TopBar = ({ title, btn, window }) => {
  const [drawer, setDrawer] = React.useState(false);
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (!document.getElementById('drawer')) return;
    if (!drawer) document.getElementById('drawer').classList.add('hide');
    else document.getElementById('drawer').classList.remove('hide');
  }, [drawer]);
  React.useEffect(() => {
    console.log('here');
    document.getElementById('drawer').classList.add('hide');
    if (drawer) setDrawer(!drawer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
      }}
      className="col-12"
    >
      <div style={{ flexGrow: 1, padding: '.5em .5em .5em 1em' }}>
        <Typography
          title
   
        >
          {title}
        </Typography>
      </div>

      <IconButton
        className="navbar-toggler"
        onClick={() => {
          setDrawer(!drawer);
        }}
        style={{ border: 'none' }}
      >
        <MenuIcon />
      </IconButton>
      {drawer && (
        <div
          onClick={() => {
            setDrawer(!drawer);
          }}
          className="backdrop"
        />
      )}
    </Navbar>
  );
};

export default TopBar;

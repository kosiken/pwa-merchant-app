import React from 'react';

import { Navbar } from 'react-bootstrap';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';
import { FiMenu as MenuIcon } from 'react-icons/fi';
import './TopBar.scss';

const TopBar = ({ title, btn, window }) => {
  const [drawer, setDrawer] = React.useState(false);

  React.useEffect(() => {
    if (!document.getElementById('drawer')) return;
    if (!drawer) document.getElementById('drawer').classList.add('hide');
    else document.getElementById('drawer').classList.remove('hide');
  }, [drawer]);

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: '#ffdc4a',
        alignItems: 'center',
      }}
      className="col-12"
    >
      <div style={{ flexGrow: 1, padding: '.5em .5em .5em 1em' }}>
        <Typography inline>{title}</Typography>
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

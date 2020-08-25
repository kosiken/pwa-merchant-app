import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';
import { FiUser as UserIcon, FiMenu as MenuIcon } from 'react-icons/fi';
import './TopBar.scss';

const TopBar = ({ title, btn, window }) => {
  const [drawer, setDrawer] = React.useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log('here');
  }, [drawer]);
  const logOut = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

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
          if (!document.getElementById('drawer')) return;
          if (!drawer) document.getElementById('drawer').classList.add('show');
          else document.getElementById('drawer').classList.remove('show');

          setDrawer(!drawer);
        }}
        style={{ border: 'none' }}
      >
        <MenuIcon />
      </IconButton>
    </Navbar>
  );
};

export default TopBar;

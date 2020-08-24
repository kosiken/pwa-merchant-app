import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar } from 'react-bootstrap';
//import { Link } from "react-router-dom";

import logo from '../../assets/logo-variant.png';

const TopBar = ({ title, btn, window }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  let links = [
    {
      url: '/',
      name: 'Home',
    },
    {
      url: '/notifications',
      name: 'Notifications',
    },

    {
      url: '/customers',
      name: 'Customers',
    },

    {
      url: '/FoodItems',
      name: 'Food Items',
    },
  ];

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{
        backgroundColor: '#ffdc4a',
      }}
    >
      <Navbar.Brand>
        <Link className="rest" to="/">
          <img
            alt=""
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
        </Link>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {links.map((link, i) => (
          <Link
            to={link.url}
            key={'link' + i}
            className={
              'nav-link ' + (location.pathname === link.url ? 'active' : '')
            }
          >
            {link.name}
          </Link>
        ))}
        <Link to="#" className="nav-link" onClick={logOut}>
          Log Out
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;

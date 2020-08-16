import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './TopBar.scss';

import Typography from '../Typography/Typography';
import { FiMoreVertical as MoreIcon } from 'react-icons/fi';
import logo from '../../assets/logo-variant.png';

const TopBar = ({ title, btn }) => {
  const dispatch = useDispatch();

  const signOut = async () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  return (
    <div className="top-bar">
      <div className="row">
        {!!btn ? (
          <div> {btn}</div>
        ) : (
          <Link to="/">
            <img alt="" src={logo} width="40" height="40" />
          </Link>
        )}

        <Typography
          title
          style={{
            margin: '0 0 0 10px',
          }}
        >
          {title || 'Page One'}
        </Typography>
      </div>

      <div>
        <Typography
          title
          style={{
            margin: '0 0 0 10px',
          }}
        >
          <a style={{ color: '#f0324b' }} href="#" onClick={signOut}>
            Log Out
          </a>
        </Typography>
      </div>
    </div>
  );
};

export default TopBar;

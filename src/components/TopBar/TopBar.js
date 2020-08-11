import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.scss';

import Typography from '../Typography/Typography';
import { FiMoreVertical as MoreIcon } from 'react-icons/fi';
import logo from '../../assets/logo-variant.png';

const TopBar = ({ title, btn }) => {
  return (
    <div className="top-bar">
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
  );
};

export default TopBar;

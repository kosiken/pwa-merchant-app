import React from 'react';
import { Link } from 'react-router-dom';
import './TopBar.scss';
import IconButton from '../IconButton/IconButton';
import Typography from '../Typography/Typography';
import { FiMoreVertical as MoreIcon } from 'react-icons/fi';
import logo from '../../assets/logo-variant.png';

const TopBar = ({ title, btn }) => {
  return (
    <div className="top-bar flex">
      {!!btn ? (
        <div> {btn}</div>
      ) : (
        <Link to="/">
          <img alt="" src={logo} width="40" height="40" />
        </Link>
      )}

      <Typography title>{title || 'Page One'}</Typography>
      <IconButton>
        <MoreIcon />
      </IconButton>
    </div>
  );
};

export default TopBar;

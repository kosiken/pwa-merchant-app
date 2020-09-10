import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Navbar, Dropdown } from 'react-bootstrap';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { FiMenu as MenuIcon, FiMoreVertical as MoreIcon } from 'react-icons/fi';
import './TopBar.scss';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    style={{ border: 'none', color: '#fff', fontSize: '1.2em' }}
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

const TopBar = ({ title }) => {
  const [drawer, setDrawer] = React.useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };

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
        backgroundColor: '#011627',
        alignItems: 'center',
      }}
      className="col-12 mb-4"
    >
      <Helmet>
        <title>{'500 Dash | ' + title}</title>
      </Helmet>
      <IconButton
        className="navbar-toggler"
        onClick={() => {
          setDrawer(!drawer);
        }}
        style={{ border: 'none', color: '#fff' }}
      >
        <MenuIcon />
      </IconButton>
      <div style={{ flexGrow: 1, padding: '0.5em 0px 0.5em 1em' }}>
        <Typography
          title
          style={{
            color: '#ffdc4a',
            lineHeight: '1.2em',
          
          }}
        >
          500 Dash
        </Typography>
      </div>

      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <MoreIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ left: '-150px' }}>
          <Dropdown.Item eventKey="1">
            <Button onClick={logOut} color="clear">
              Logout
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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

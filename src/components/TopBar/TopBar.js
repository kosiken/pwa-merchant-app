import React from 'react';
import { useLocation, Link } from 'react-router-dom';
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
        backgroundColor: '#1c77c3',
        alignItems: 'center',
        boxShadow: '0 1px 6px 0 rgba(32, 33, 36, 0.28)',
      }}
      className="col-12"
    >
      <Helmet>
        <title>{'500dash | ' + title}</title>
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
        <Link to="/home">
          {' '}
          <Typography
            title
            style={{
              color: '#fff',
              fontWeight: '700',
              lineHeight: '1.2em',
            }}
          >
            500dash
          </Typography>{' '}
        </Link>
      </div>

      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <MoreIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ left: '-150px' }}>
          <Dropdown.Item eventKey="1">
            <Button
              style={{
                width: '100%',
              }}
              onClick={logOut}
              color="clear"
            >
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

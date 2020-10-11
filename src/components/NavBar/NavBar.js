import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Button from '../Button/Button';
import Typography from '../Typography/Typography';
import { Link, useLocation } from 'react-router-dom';

//
//

const links = [
  {
    url: '/',
    name: 'Home',
  },
  {
    url: '/about',
    name: 'About',
  },
  {
    url: '/contact',
    name: 'Contact',
  },
  {
    url: '/signup',
    name: 'Sign Up',
    button: true,
  },
];

const NavBar = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <Container>
        <Navbar
          expand="lg"
          sticky="top"
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <Navbar.Brand>
            {' '}
            <Typography
              variant="primary"
              className="mb-0"
              style={{
                fontSize: '1.5em',
                fontWeight: '700',
              }}
            >
              500dash
            </Typography>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {links.map((link, index) => {
              if (link.button) {
                return (
                  <Link
                    to={link.url}
                    className={'nav-link'}
                    key={'landing-link' + index}
                  >
                    <Button>{link.name}</Button>
                  </Link>
                );
              } else
                return (
                  <Link
                    to={link.url}
                    className={
                      'nav-link ' + (pathname === link.url ? 'active' : '')
                    }
                    key={'landing-link' + index}
                  >
                    <Typography inline bold>
                      {link.name}
                    </Typography>
                  </Link>
                );
            })}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
};

export default NavBar;

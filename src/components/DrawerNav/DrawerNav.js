import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';

import { Nav } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UsersIcon,
  FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-icons/fi';

let links = [
  {
    url: '/',
    name: 'Home',
    icon: <HomeIcon />,
  },
  {
    url: '/FoodItems',
    name: 'Food Items',
    icon: <PaperIcon />,
  },
  // {
  //   url: '/meals',
  //   name: 'Meals',
  //   icon: <Database />,
  // },
  {
    url: '/orders',
    name: 'Orders',
    icon: <ShoppingBag />,
  },
  {
    url: '/customers',
    name: 'Customers',
    icon: <UsersIcon />,
  },
  {
    url: '/profile',
    name: 'Profile',
    icon: <UserIcon />,
  },
];

const DrawerNav = () => {
  const { pathname } = useLocation();

  return (
    <aside className="side-nav hide" id="drawer" style={{}}>
      {/*   <section
        className="p-4"
        style={{
          backgroundColor: '#011627',
          color: '#fff',
        }}
      >
        <Container className="p-2">
      
          <Row className="m-0 pl-2">
            <Typography
              title
              style={{
                fontSize: '18px',
              }}
            >
              {name}
            </Typography>
          </Row>
          <Row className="m-0 pl-2">
            <Typography small>{email}</Typography>
          </Row>
        </Container>
        <Button full onClick={logOut}>
          Log Out
        </Button>
      </section>

      <br />
      */}
      <Nav className="flex-column h-80">
        {links.map((link, i) => (
          <Link
            to={link.url}
            className={'nav-link ml flex-row center '}
            key={'link' + i}
          >
            <span
              className={'info ' + (pathname === link.url ? 'active' : '')}
              style={{
                marginRight: '15px',
              }}
            >
              {link.icon}
            </span>
            <Typography
              inline
              className={'info ' + (pathname === link.url ? 'active' : '')}
            >
              {link.name}
            </Typography>
          </Link>
        ))}
      </Nav>
      <Typography
        style={{
          textAlign: 'center',
          position: 'absolute',
          display: 'block',
          bottom: '0',
          left: '0',
          width: '100%',
        }}
      >
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️{' '}
        </span>
        <span
          style={{
            color: '#f0324b',
          }}
        >
          500Chow
        </span>
      </Typography>
    </aside>
  );
};

export default DrawerNav;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';

import { Nav } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UsersIcon,
  // FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  FiCreditCard as CreditCardIcon,
  // FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-icons/fi';

let links = [
  {
    url: '/home',
    name: 'Home',
    icon: <HomeIcon />,
  },
  // {
  //   url: '/FoodItems',
  //   name: 'Food Items',
  //   icon: <PaperIcon />,
  // },
  // {
  //   url: '/meals',
  //   name: 'Meals',
  //   icon: <Database />,
  // },
  {
    url: '/delivery-requests',
    name: 'Delivery Requests',
    icon: <ShoppingBag />,
  },
  {
    url: '/customers',
    name: 'Saved Recipients',
    icon: <UsersIcon />,
  },
  {
    url: '/cards',
    name: 'Cards',
    icon: <CreditCardIcon />,
  },
  // {
  //   url: '/profile',
  //   name: 'Profile',
  //   icon: <UserIcon />,FiCreditCard
  // },
];

const DrawerNav = () => {
  const { pathname } = useLocation();

  return (
    <aside className="side-nav hide" id="drawer" style={{}}>
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

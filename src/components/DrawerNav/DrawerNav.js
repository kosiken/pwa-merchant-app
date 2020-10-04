import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';

import { Nav } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UsersIcon,
  // FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  FiUser as UserIcon,
  // FiDatabase as Database,
} from 'react-icons/fi';
import { RiWalletLine as WalletIcon } from 'react-icons/ri';
let links = [
  {
    url: '/home',
    name: 'Home',
    icon: <HomeIcon />,
  },
  // {
  //   url: '/FoodItems',
  //   name: 'Food Items',BiWallet
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
    name: 'Saved Customers',
    icon: <UsersIcon />,
  },
  {
    url: '/wallet',
    name: 'Wallet',
    icon: <WalletIcon />,
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
      <Nav className="flex-column h-80">
        {links.map((link, i) => (
          <Link
            to={link.url}
            className={'nav-link ml flex-row center '}
            key={'link' + i}
            style={{
              padding: '.5rem 1rem',
            }}
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
            color: '#1c77c3',
          }}
        >
          500Chow
        </span>
      </Typography>
    </aside>
  );
};

export default DrawerNav;

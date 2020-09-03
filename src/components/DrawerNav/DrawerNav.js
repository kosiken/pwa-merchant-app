import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Container, Row, Image } from 'react-bootstrap';
import {
  FiHome as HomeIcon,
  FiUsers as UserIcon,
  FiFileText as PaperIcon,
  FiShoppingBag as ShoppingBag,
  // FiDatabase as Database,
} from 'react-icons/fi';

import avatar from '../../assets/avatar.png';
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
    icon: <UserIcon />,
  },
];

const DrawerNav = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { email, name } = useSelector((state) => {
    return {
      name: state.auth.user.name,
      email: state.auth.user.email_address,
    };
  });
  const logOut = () => {
    dispatch({
      type: 'LOGOUT_USER',
    });
  };

  return (
    <aside className="side-nav hide" id="drawer">
      <Container
        className="p-2"
        style={{
          marginTop: '1em',
        }}
      >
        <div className="mb-2">
          <Image
            src={avatar}
            style={{
              width: '50px',
            }}
            roundedCircle
          />
        </div>
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
        <Button color="clear" onClick={logOut}>
          Log Out
        </Button>
      </Container>
      <br />
      <Nav className="flex-column h-80">
        {links.map((link, i) => (
          <Link
            to={link.url}
            className={
              'nav-link ml flex-row center ' +
              (pathname === link.url ? 'active' : '')
            }
            key={'link' + i}
          >
            <span
              style={{
                marginRight: '15px',
              }}
            >
              {link.icon}
            </span>
            <Typography inline>{link.name}</Typography>
          </Link>
        ))}
      </Nav>
    </aside>
  );
};

export default DrawerNav;
